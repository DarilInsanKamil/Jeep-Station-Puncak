import { t } from 'elysia'

export namespace BundlesModel {
    export const BundlesPayload = t.Object({
        addOns: t.String(),
        title: t.String({ minLength: 1 }),
        deskripsi: t.String({ minLength: 1 }),
        harga: t.String({ minLength: 1 }),
        jumlah_unit: t.Numeric(),
        gambar_bundle: t.File({
            maxSize: '6m',
            type: 'image/*'
        }),
        is_active: t.String()
    })
    export type BundlesPayload = typeof BundlesPayload.static
    export const EditBundlePayload = t.Partial(BundlesPayload)
    export type EditBundlePayload = typeof EditBundlePayload.static

    export const BundleResponse = t.Array(
        t.Object({
            id: t.String(),
            title: t.String({ minLength: 1 }),
            deskripsi: t.String({ minLength: 1 }),
            harga: t.String({ minLength: 1 }),
            jumlah_unit: t.Numeric(),
            gambar_bundles: t.String(),
            is_active: t.Boolean(),
            created_at: t.Date(),
            updated_at: t.Date()
        })
    )
    export type BundleResponse = typeof BundleResponse.static

    export const BundleResponseById = t.Object({
        id: t.String(),
        title: t.String({ minLength: 1 }),
        deskripsi: t.String({ minLength: 1 }),
        harga: t.String({ minLength: 1 }),
        jumlah_unit: t.Numeric(),
        gambar_bundles: t.String(),
        is_active: t.Boolean(),
        created_at: t.Date(),
        updated_at: t.Date()
    })
    export type BundleResponseById = typeof BundleResponseById.static

    export const BudndlesSuccess = t.Object({
        message: t.String({ minLength: 1 }),
        id: t.String({ minLength: 1 })
    })
    export type BudndlesSuccess = typeof BudndlesSuccess.static;

    export const ErrorResponse = t.Object({
        success: t.Boolean(),
        message: t.String()
    })
    export type ErrorResponse = typeof ErrorResponse.static
}