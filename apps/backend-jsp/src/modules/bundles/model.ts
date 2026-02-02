import { t } from 'elysia'

export namespace BundlesModel {
    export const BundlesPayload = t.Object({
        addOns: t.Array(t.String()),
        main: t.Object({
            id: t.String(),
            title: t.String({ minLength: 1 }),
            deskripsi: t.String({ minLength: 1 }),
            harga: t.String({ minLength: 1 }),
            gambar_bundle: t.File({
                maxSize: '6m',
                type: 'image/*'
            }),
            is_active: t.Boolean()
        })
    })
    export type BundlesPayload = typeof BundlesPayload.static
}