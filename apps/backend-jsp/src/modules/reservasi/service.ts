import { PoolClient } from "pg"
import { ReservasiError } from "../../errors/reservasiError"
import { pool } from "../../utils/db"
import { CustomerService } from "../customer/service"
import { ReservasiModel } from "./model"
import { nanoid } from "nanoid"

export abstract class ReservasiService {
    static async checkAvailability(armadaId: string, tglMulai: string, tglSelesai: string, client?: PoolClient) {
        const db = client || pool
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
        return result.rows.length === 0;
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

            const isAvailable = await this.checkAvailability(reservasi.armada_id, reservasi.tanggal_mulai, reservasi.tanggal_selesai, client)
            if (!isAvailable) {
                throw new ReservasiError("Armada tidak tersedia pada tanggal tersebut", 400)
            }
            const customerId = await CustomerService.addCustomer(customer, client)
            const reservasiId = `res-${nanoid(16)}`
            const tglSewa = new Date().toISOString()
            const kodeBooking = `INV-JSP${nanoid(16)}`
            await client.query({
                text: `insert into reservasi ("id", "customer_id", "armada_id", "tanggal_mulai" , "tanggal_selesai", "durasi", "total_harga", "minimal_dp", "sisa_pembayaran", "status_transaksi", "created_at", "kode_booking")
                values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                values: [reservasiId, customerId, reservasi.armada_id, reservasi.tanggal_mulai, reservasi.tanggal_selesai, durasi, reservasi.total_harga, minimalDP, sisaPembayaran, "Menunggu DP", tglSewa, kodeBooking]
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
            console.error('PG ERROR:', err.message)
            console.error('QUERY:', err.query)
            console.error('DETAIL:', err.detail)
            await client.query('ROLLBACK');
            console.error(err);
            throw err;
        } finally {
            client.release();
        }
    }
}