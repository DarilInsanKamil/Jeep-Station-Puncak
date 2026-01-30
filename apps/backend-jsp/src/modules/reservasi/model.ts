import { t } from 'elysia'

export namespace ReservasiModel {
    export const ReservasiPayload = t.Object({
        reservasi: t.Object({
            tanggal_mulai: t.String({ minLength: 1 }),
            tanggal_selesai: t.String({ minLength: 1 }),
            armada_id: t.String({ minLength: 1 }),
            total_harga: t.String({ minLength: 1 }),
            metode_pembayaran: t.String({ minLength: 1 })
        }),
        customer: t.Object({
            nama_lengkap: t.String({ minLength: 1 }),
            email: t.String({ format: 'email', minLength: 1 }),
            no_hp: t.String({ minLength: 1 }),
            alamat: t.String({ minLength: 1 })
        })
    })
    export type ReservasiPayload = typeof ReservasiPayload.static
}