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

    export const GalleryResponse = t.Array(
        t.Object({
            id: t.String(),
            deskripsi: t.String(),
            gambar_url: t.String(),
            created_at: t.Date(),
            updated_at: t.Date()
        })
    )

    export type GalleryResponse = typeof GalleryResponse.static

    export const GallerySuccess = t.Object({
        message: t.String({ minLength: 1 }),
        id: t.String({ minLength: 1 })
    })
    export type GallerySuccess = typeof GallerySuccess.static;

    export const ErrorResponse = t.Object({
        success: t.Boolean(),
        message: t.String()
    })
    export type ErrorResponse = typeof ErrorResponse.static
}