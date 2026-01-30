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
                AND status != 'dibatalkan'
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

            const isAvailable = await this.checkAvailability(reservasi.armada_id, reservasi.tanggal_mulai, reservasi.tanggal_selesai, client)
            if (!isAvailable) {
                throw new ReservasiError("Armada tidak tersedia pada tanggal tersebut", 400)
            }
            const customerId = await CustomerService.addCustomer(customer, client)
            const reservasiId = `res-${nanoid(16)}`
            const tglSewa = new Date().toISOString()

            await client.query({
                text: `insert into reservasi ("id", "user_id", "armada_id", "tanggal_mulai" , "tanggal_selesai", "total_harga", "status_transaksi", "created_at")
                values($1, $2, $3, $4, $5, $6, $7, $8)`,
                values: [reservasiId, customerId, reservasi.armada_id, reservasi.tanggal_mulai, reservasi.tanggal_selesai, reservasi.total_harga, "Menunggu Pembayaran", tglSewa]
            })

            const pembayaranId = `pay-${nanoid(16)}`
            await client.query({
                text: `insert into pembayaran ("id", "reservasi_id", "metode_pembayaran", "nominal", "status")
                values ($1, $2, $3, $4, $5) returning id`,
                values: [pembayaranId, reservasiId, reservasi.metode_pembayaran, reservasi.total_harga, "Pending"]
            })
            await client.query('COMMIT')
            return {
                reservasiId,
                customerId,
                message: 'Reservasi berhasil dibuat'
            }
        } catch (err) {
            await client.query('ROLLBACK'); // Batalkan semua (Customer & Reservasi)
            console.error(err);
            throw err;
        } finally {
            client.release();
        }
    }
}