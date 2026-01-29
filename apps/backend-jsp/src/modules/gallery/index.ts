import { Elysia, status } from "elysia";
import { GalleryError } from "../../errors/galleryError";
import { GalleryService } from "./service";
import { GalleryModel } from "./model";

export const gallery = new Elysia({ prefix: '/gallery' })
    .error({ GALLERY_ERROR: GalleryError })
    .onError(({ code, error, set }) => {
        if (code === 'GALLERY_ERROR') {
            set.status = error.status;
            return error.toResponse();
        }
    })
    .post(
        '/upload',
        async ({ body }) => {
            const response = await GalleryService.uploadGambar(body)
            return status(201, {
                message: 'Berhasil menambah data gallery',
                id: response
            })
        }, {
        body: GalleryModel.GalleryPayload,
        response: {
            201: GalleryModel.GallerySuccess,
            400: GalleryModel.ErrorResponse
        },
        detail: {
            summary: "Upload gambar",
            tags: ["Gallery"]
        }
    }
    )
    .get(
        '/',
        async ({ query }) => {
            const { limit = 5 } = query
            const response = await GalleryService.getAllImageGallery(Number(limit))
            return status(200, response)
        }, {
        response: {
            200: GalleryModel.GalleryResponse,
            400: GalleryModel.ErrorResponse
        },
        detail: {
            summary: "Get Image Gallery",
            tags: ["Gallery"]
        }
    }
    )
    .delete(
        '/:galleryId',
        async ({ params }) => {
            const galleryId = params.galleryId
            await GalleryService.deleteImageGallery(galleryId)
            return status(204)
        }, {
        detail: {
            summary: "Delete Image Gallery",
            tags: ["Gallery"]
        }
    }
    )