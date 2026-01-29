import { t } from 'elysia'

export namespace ArmadaModel {
    export const ArmadaPayload = t.Object({
        nama_armada: t.String({ minLength: 1 }),
        gambar_armada: t.Optional(
            t.File({
                type: 'image',
                maxSize: '6m'
            })
        ),
        plat_nomor: t.String({ minLength: 1 }),
        kapasitas: t.Numeric(),
        deskripsi: t.String({ minLength: 1 }),
    })
    export type ArmadaPayload = typeof ArmadaPayload.static;

    export const GetArmadaQuery = t.Object({
        page: t.Optional(t.Numeric({ default: 1 })),
        limit: t.Optional(t.Numeric({ default: 1 })),
        search: t.Optional(t.String()),
        kapasitas: t.Optional(t.Numeric()),

    })
    export type GetArmadaQuery = typeof GetArmadaQuery.static;

    export const ArmadaResponseId = t.Object({
        id: t.String({ minLength: 1 }),
        nama_armada: t.String({ minLength: 1 }),
        gambar_armada: t.Optional(t.String({ minLength: 1 })),
        plat_nomor: t.String({ minLength: 1 }),
        kapasitas: t.Numeric(),
        deskripsi: t.String({ minLength: 1 }),
        created_at: t.Date(),
        updated_at: t.Date()
    })
    export type ArmadaResponseId = typeof ArmadaResponseId.static;

    export const ArmadaResponse = t.Array(
        t.Object({
            id: t.String({ minLength: 1 }),
            nama_armada: t.String({ minLength: 1 }),
            gambar_armada: t.Optional(t.String({ minLength: 1 })),
            plat_nomor: t.String({ minLength: 1 }),
            kapasitas: t.Numeric(),
            deskripsi: t.String({ minLength: 1 }),
        })
    )

    export type ArmadaResponse = typeof ArmadaResponse.static;

    export const UploadGambarArmada = t.Object({
        gambar: t.File({
            type: 'image',
            maxSize: '6m'
        })
    })
    export type UploadGambarArmada = typeof UploadGambarArmada.static

    export const ArmadaSuccess = t.Object({
        message: t.String({ minLength: 1 }),
        id: t.String({ minLength: 1 })
    })
    export type ArmadaSuccess = typeof ArmadaSuccess.static;

    export const ErrorResponse = t.Object({
        success: t.Boolean(),
        message: t.String()
    })
    export type ErrorResponse = typeof ErrorResponse.static
}