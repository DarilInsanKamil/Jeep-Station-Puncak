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
                message: '',
                id: response
            })
        }, {
        body: GalleryModel.GalleryPayload,
        detail: {
            summary: "Upload gambar",
            tags: ["Gallery"]
        }
    }
    )