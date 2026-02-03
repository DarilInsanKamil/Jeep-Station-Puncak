import { t } from 'elysia'

export namespace ReservasiModel {
    export const ReservasiPayload = t.Object({
        reservasi: t.Object({
            tanggal_mulai: t.String({ minLength: 1 }),
            tanggal_selesai: t.String({ minLength: 1 }),
            armada_id: t.String({ minLength: 1 }),
            total_harga: t.String({ minLength: 1 }),
            metode_pembayaran: t.String({ minLength: 1 }),
            jumlah_unit: t.Numeric()
        }),
        customer: t.Object({
            nama_lengkap: t.String({ minLength: 1 }),
            email: t.String({ format: 'email', minLength: 1 }),
            no_hp: t.String({ minLength: 1 }),
            alamat: t.String({ minLength: 1 })
        })
    })
    export type ReservasiPayload = typeof ReservasiPayload.static

    export const ReservasiResponse = t.Array(
        t.Object({
            id: t.String(),
            kode_booking: t.String(),
            tanggal_mulai: t.Date(),
            tanggal_selesai: t.Date(),
            status_transaksi: t.String(),
            total_harga: t.Numeric(),
            jumlah_unit: t.Numeric(),
            nama_customer: t.String(),
            nama_armada: t.String(),
            nama_bundle: t.Optional(t.String()),
            created_at: t.Date(),
            updated_at: t.Date()
        })
    )
    export type ReservasiResponse = typeof ReservasiResponse.static

    export const ReservasiResponseById = t.Object({
        id: t.String(),
        kode_booking: t.String(),
        durasi: t.Numeric(),
        minimal_dp: t.String(),
        sisa_pembayaran: t.String(),
        tanggal_mulai: t.Date(),
        tanggal_selesai: t.Date(),
        status_transaksi: t.String(),
        total_harga: t.Numeric(),
        jumlah_unit: t.Numeric(),
        nama_customer: t.String(),
        nama_armada: t.String(),
        nama_bundle: t.Optional(t.String()),
        created_at: t.Date(),
        updated_at: t.Date()
    })

    export type ReservasiResponseById = typeof ReservasiResponseById.static

    export const ReservasiSuccess = t.Object({
        message: t.String({ minLength: 1 }),
        id: t.String({ minLength: 1 })
    })
    export type ReservasiSuccess = typeof ReservasiSuccess.static;

    export const ErrorResponse = t.Object({
        success: t.Boolean(),
        message: t.String()
    })
    export type ErrorResponse = typeof ErrorResponse.static
}