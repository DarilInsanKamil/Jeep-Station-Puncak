import { PoolClient } from "pg"
import { ReservasiError } from "../../errors/reservasiError"
import { pool } from "../../utils/db"
import { CustomerService } from "../customer/service"
import { ReservasiModel } from "./model"
import { nanoid } from "nanoid"

export abstract class ReservasiService {
    static async checkAvailability(armadaId: string | null | undefined, tglMulai: string, tglSelesai: string, jumlahDibutuhkan: number = 1, client?: PoolClient) {
        const db = client || pool
        const totalArmadaRes = await db.query('SELECT COUNT(*) as total FROM armada');
        const totalStokFisik = parseInt(totalArmadaRes.rows[0].total);
        const terpakaiQuery = {
            text: `
            SELECT SUM(COALESCE(jumlah_unit, 1)) as total_terpakai 
            FROM reservasi 
            WHERE status_transaksi != 'dibatalkan'
            AND (
                (tanggal_mulai <= $1 AND tanggal_selesai >= $1) OR
                (tanggal_mulai <= $2 AND tanggal_selesai >= $2) OR
                (tanggal_mulai >= $1 AND tanggal_selesai <= $2)
            )
        `,
            values: [tglMulai, tglSelesai]
        };
        const terpakaiRes = await db.query(terpakaiQuery);
        const totalTerpakai = parseInt(terpakaiRes.rows[0].total_terpakai || '0');

        if ((totalStokFisik - totalTerpakai) < jumlahDibutuhkan) {
            return false;
        }

        if (armadaId) {
            const query = {
                text: `
                SELECT id FROM reservasi 
                WHERE armada_id = $1 
                AND status_transaksi != 'dibatalkan'
                AND (
                    (tanggal_mulai <= $2 AND tanggal_selesai >= $2) OR
                    (tanggal_mulai <= $3 AND tanggal_selesai >= $3) OR
                    (tanggal_mulai >= $2 AND tanggal_selesai <= $3)
                )
            `,
                values: [armadaId, tglMulai, tglSelesai]
            };
            const result = await db.query(query)
            if (result.rows.length > 0) {
                return false;
            }
        }
        return true

    }
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
            const unitDibutuhkan = reservasi.jumlah_unit || 1;
            const isAvailable = await this.checkAvailability(reservasi.armada_id, reservasi.tanggal_mulai, reservasi.tanggal_selesai, reservasi.jumlah_unit, client)
            if (!isAvailable) {
                throw new ReservasiError("Armada tidak tersedia pada tanggal tersebut", 400)
            }
            const customerId = await CustomerService.addCustomer(customer, client)
            const reservasiId = `res-${nanoid(16)}`
            const tglSewa = new Date().toISOString()
            const kodeBooking = `INV-JSP${nanoid(16)}`
            await client.query({
                text: `insert into reservasi ("id", "customer_id", "armada_id", "tanggal_mulai" , "tanggal_selesai", "durasi", "total_harga", "minimal_dp", "sisa_pembayaran", "status_transaksi", "created_at", "kode_booking", "jumlah_unit")
                values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
                values: [reservasiId, customerId, reservasi.armada_id, reservasi.tanggal_mulai, reservasi.tanggal_selesai, durasi, reservasi.total_harga, minimalDP, sisaPembayaran, "Menunggu DP", tglSewa, kodeBooking, unitDibutuhkan]
            })

            const pembayaranId = `pay-${nanoid(16)}`
            await client.query({
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
}