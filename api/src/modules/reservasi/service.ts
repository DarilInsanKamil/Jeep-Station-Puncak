import { PoolClient } from "pg"
import { ReservasiError } from "../../errors/reservasiError"
import { pool } from "../../utils/db"
import { CustomerService } from "../customer/service"
import { ReservasiModel } from "./model"
import { nanoid } from "nanoid"

export abstract class ReservasiService {


  private static async checkAvailability(
      tanggal_mulai: string,
      tanggal_selesai: string,
      jumlah_unit_diminta: number,
      armada_id: string | null,
      client: any
  ): Promise<boolean> {

      // ==========================================
      // 1. CEK KAPASITAS GLOBAL (ALL FISIK MOBIL)
      // ==========================================

      // A. Hitung total fisik semua armada yang tersedia di database
      const totalArmadaResult = await client.query('SELECT COUNT(id) as total FROM armada');
      const totalFisik = Number(totalArmadaResult.rows[0].total);

      // B. Hitung jumlah unit yang terpakai (dari reservasi Armada & Bundle) pada rentang tanggal tersebut.
      // Logic Overlap: reservasi.tanggal_mulai < target.tanggal_selesai AND reservasi.tanggal_selesai > target.tanggal_mulai
      const terpakaiResult = await client.query({
          text: `
              SELECT COALESCE(SUM(jumlah_unit), 0) as terpakai
              FROM reservasi
              WHERE
                  status_transaksi NOT IN ('Dibatalkan', 'Selesai')
                  AND tanggal_mulai < $2
                  AND tanggal_selesai > $1
          `,
          values: [tanggal_mulai, tanggal_selesai]
      });

      const totalTerpakai = Number(terpakaiResult.rows[0].terpakai);
      const sisaUnitTersedia = totalFisik - totalTerpakai;

      // Jika sisa unit tidak cukup, langsung kembalikan false
      if (sisaUnitTersedia < jumlah_unit_diminta) {
          return false;
      }

      // ==========================================
      // 2. CEK ARMADA SPESIFIK (JIKA BUKAN BUNDLE)
      // ==========================================

      if (armada_id) {
          // Jika user memilih mobil tertentu, pastikan mobil itu tidak masuk di daftar reservasi aktif
          const specificArmadaResult = await client.query({
              text: `
                  SELECT id FROM reservasi
                  WHERE
                      armada_id = $1
                      AND status_transaksi NOT IN ('Dibatalkan', 'Selesai')
                      AND tanggal_mulai < $3
                      AND tanggal_selesai > $2
                  LIMIT 1
              `,
              values: [armada_id, tanggal_mulai, tanggal_selesai]
          });

          if (specificArmadaResult.rows.length > 0) {
              return false;
          }
      }

      return true;
  }
    // static async checkAvailability(armadaId: string | null | undefined, tglMulai: string, tglSelesai: string, jumlahDibutuhkan: number = 1, client?: PoolClient) {
    //     const db = client || pool
    //     const totalArmadaRes = await db.query('SELECT COUNT(*) as total FROM armada');
    //     const totalStokFisik = parseInt(totalArmadaRes.rows[0].total);
    //     const terpakaiQuery = {
    //         text: `
    //         SELECT SUM(COALESCE(jumlah_unit, 1)) as total_terpakai
    //         FROM reservasi
    //         WHERE status_transaksi != 'dibatalkan'
    //         AND (
    //             (tanggal_mulai <= $1 AND tanggal_selesai >= $1) OR
    //             (tanggal_mulai <= $2 AND tanggal_selesai >= $2) OR
    //             (tanggal_mulai >= $1 AND tanggal_selesai <= $2)
    //         )
    //     `,
    //         values: [tglMulai, tglSelesai]
    //     };
    //     const terpakaiRes = await db.query(terpakaiQuery);
    //     const totalTerpakai = parseInt(terpakaiRes.rows[0].total_terpakai || '0');

    //     if ((totalStokFisik - totalTerpakai) < jumlahDibutuhkan) {
    //         return false;
    //     }

    //     if (armadaId) {
    //         const query = {
    //             text: `
    //             SELECT id FROM reservasi
    //             WHERE armada_id = $1
    //             AND status_transaksi != 'dibatalkan'
    //             AND (
    //                 (tanggal_mulai <= $2 AND tanggal_selesai >= $2) OR
    //                 (tanggal_mulai <= $3 AND tanggal_selesai >= $3) OR
    //                 (tanggal_mulai >= $2 AND tanggal_selesai <= $3)
    //             )
    //         `,
    //             values: [armadaId, tglMulai, tglSelesai]
    //         };
    //         const result = await db.query(query)
    //         if (result.rows.length > 0) {
    //             return false;
    //         }
    //     }
    //     return true
    // }
    static async addReservasi(payload: ReservasiModel.ReservasiPayload) {
        const client = await pool.connect()

        try {
            await client.query('BEGIN')
            const { customer, reservasi } = payload

            const durasi =
                Math.ceil(
                    (new Date(reservasi.tanggal_selesai).getTime() -
                        new Date(reservasi.tanggal_mulai).getTime()) /
                    (1000 * 60 * 60 * 24)
                )

          const minimalDP = Math.floor(Number(reservasi.total_harga) * 0.3)
          const sisaPembayaran = Number(reservasi.total_harga) - minimalDP

          let unitDibutuhkan = Number(reservasi.jumlah_unit) || 1;

          if (reservasi.bundle_id) {
                      const bundleResult = await client.query({
                          text: 'SELECT jumlah_unit FROM bundles WHERE id = $1',
                          values: [reservasi.bundle_id]
                      });

                      if (bundleResult.rows.length > 0) {
                          let unitDariBundle = Number(bundleResult.rows[0].jumlah_unit);
                          unitDibutuhkan = unitDibutuhkan * unitDariBundle;
                      }
          }

          const isAvailable = await this.checkAvailability(
              reservasi.tanggal_mulai,
              reservasi.tanggal_selesai,
              unitDibutuhkan,
              reservasi.armada_id || null,
              client
          );

          if (!isAvailable) {
              if (reservasi.bundle_id) {
                   throw new ReservasiError("Kuota unit / mobil tidak mencukupi untuk paket bundle pada tanggal tersebut", 400);
              } else {
                   throw new ReservasiError("Armada spesifik atau sisa unit global tidak tersedia pada tanggal tersebut", 400);
              }
          }


            const customerId = await CustomerService.addCustomer(customer, client)
            const reservasiId = `res-${nanoid(16)}`
            const tglSewa = new Date().toISOString()
            const kodeBooking = `INV-JSP${nanoid(16)}`
            await client.query({
                text: `insert into reservasi ("id", "customer_id", "armada_id", "tanggal_mulai" , "tanggal_selesai", "durasi", "total_harga", "minimal_dp", "sisa_pembayaran", "status_transaksi", "created_at", "kode_booking", "jumlah_unit", "bundle_id")
                values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
                values: [reservasiId, customerId, reservasi.armada_id || null, reservasi.tanggal_mulai, reservasi.tanggal_selesai, durasi, reservasi.total_harga, minimalDP, sisaPembayaran, "Menunggu DP", tglSewa, kodeBooking, unitDibutuhkan, reservasi.bundle_id || null]
            })

            const pembayaranId = `pay-${nanoid(16)}`
           const result =  await client.query({
                text: `INSERT INTO pembayaran
           ("id", "reservasi_id", "metode_pembayaran", "nominal", "jenis_pembayaran")
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id`,
                values: [
                    pembayaranId,
                    reservasiId,
                    reservasi.metode_pembayaran,
                    minimalDP,
                    "DP"
                ]
            })
            await client.query('COMMIT')
          return {
                reservasiId,
                customerId,
                message: 'Reservasi berhasil dibuat'
            }
        } catch (err: any) {
            await client.query('ROLLBACK');
            console.error(err);
            throw err;
        } finally {
            client.release();
        }
    }

    static async getAllReservasi(userRole: string, page = 1, limit = 10, search?: string) {
        const offset = (page - 1) * limit

        if (userRole == 'admin') {
            const reservasiQuery = {
                text: `select r.id, r.kode_booking, r.tanggal_mulai, r.tanggal_selesai,
                r.status_transaksi, r.total_harga, r.jumlah_unit, r.created_at, r.updated_at, c.nama_lengkap as nama_customer, a.nama_armada,
                b.title as nama_bundle from reservasi r join customers c on r.customer_id = c.id left join armada
                a on r.armada_id = a.id left join bundles b on r.bundle_id = b.id where c.nama_lengkap ilike $1 or r.kode_booking = $1
                order by r.created_at desc limit $2 offset $3`,
                values: [`%${search || ''}%`, limit, offset]
            }
            const result = await pool.query(reservasiQuery)
            return result.rows
        } throw new ReservasiError('Forbidden hanya admin yang bisa akses', 403)
    }
    static async getReservasiById(reservasiId: string) {
        const reservasiQuery = {
            text: `SELECT
                r.*,
                c.nama_lengkap, c.email, c.no_hp, c.alamat,
                a.nama_armada, a.plat_nomor, a.gambar_armada,
                b.title as nama_bundle, b.deskripsi as deskripsi_bundle
            FROM reservasi r
            JOIN customers c ON r.customer_id = c.id
            LEFT JOIN armada a ON r.armada_id = a.id
            LEFT JOIN bundles b ON r.bundle_id = b.id
            WHERE r.id = $1`,
            values: [reservasiId]
        }
        const result = await pool.query(reservasiQuery)
        if (!result.rows.length) {
            throw new ReservasiError('Data reservasi tidak ditemukan', 404)
        }
        return result.rows[0]
    }

  static async getReservasiByArmadaId(armadaId: string) {
    const reservasiQuery = {
      text: 'select "tanggal_mulai", "tanggal_selesai" from reservasi where "armada_id" = $1',
      values: [armadaId]
    }
    const result = await pool.query(reservasiQuery)
    return result.rows
  }
}
