import { t } from "elysia"

export namespace GalleryModel {
    export const GalleryPayload = t.Object({
        deskripsi: t.String({ minLength: 1 }),
        gambar_url: t.File({
            maxSize: '6m',
            type: 'image',
        })
    })
    export type GalleryPayload = typeof GalleryPayload.static
}