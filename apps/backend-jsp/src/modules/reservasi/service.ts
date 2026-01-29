import { ReservasiError } from "../../errors/reservasiError"
import { pool } from "../../utils/db"
import { CustomerService } from "../customer/service"

export abstract class ReservasiService {
    static async checkAvailability(armadaId: string, tanggal: string) {
        const reservasiQuery = {
            text: `select "id" from reservasi where "armada_id" = $1 and "tanggal_wisata" = $2 and "status_transaksi" != 'cancelled  `,
            values: [armadaId, tanggal]
        }
        const result = await pool.query(reservasiQuery)
        if (result.rows.length > 0) {
            return { available: false, message: 'Unit tidak tersedia' }
        }
        return { available: true, message: 'Unit tersedia' }
    }
    // static async addReservasi({ nama_lengkap, email, no_hp, armadaId, tanggal, durasi, customer_id }) {
    //     // await CustomerService.addCustomer();
    //     await this.checkAvailability(armadaId, tanggal)
    // }
}