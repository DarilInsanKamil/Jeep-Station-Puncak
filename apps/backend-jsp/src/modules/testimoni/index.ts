import Elysia, { status } from "elysia";
import { TestimoniService } from "./service";
import { TestimoniModel } from "./model";
import { TestimoniError } from "../../errors/testimoniError";

export const testimoni = new Elysia({ prefix: '/testimoni' })
    .error({ TESTIMONI_ERROR: TestimoniError })
    .onError(({ code, error, set }) => {
        if (code === 'TESTIMONI_ERROR') {
            set.status = error.status;
            return error.toResponse();
        }
    })
    .post(
        '/create',
        async ({ body }) => {
            const response = await TestimoniService.addTestimoni(body)
            return status(201, {
                message: 'Berhasil menambahkan data testimoni',
                id: response
            })
        }, {
        body: TestimoniModel.TestimoniPayload,
        response: {
            201: TestimoniModel.TestimoniSuccess,
            400: TestimoniModel.ErrorResponse
        }
    }
    )
    .get(
        '/',
        async () => {
            const response = await TestimoniService.getAllTestimoni()
            return status(200, response)
        }, {
        response: {
            200: TestimoniModel.TestimoniResponse,
            400: TestimoniModel.ErrorResponse
        }
    }
    )
    .get(
        '/:testimoniId',
        async ({ params }) => {
            const testimoniId = params.testimoniId
            const response = await TestimoniService.getTestimoniById(testimoniId)
            return status(200, response)
        }, {
        response: {
            200: TestimoniModel.TestimoniResponseId,
            404: TestimoniModel.ErrorResponse,
        }
    }
    )
    .patch(
        '/edit/:testimoniId',
        async ({ body, params }) => {
            const testimoniId = params.testimoniId
            const response = await TestimoniService.editTestimoniById(body, testimoniId)
            return status(200, {
                message: 'Berhasil merubah data armada',
                id: response
            })
        }, {
        body: TestimoniModel.TestimoniPayload,
        response: {
            200: TestimoniModel.TestimoniSuccess,
            400: TestimoniModel.ErrorResponse
        }
    }
    )
    .delete(
        '/:testimoniId',
        async ({ params }) => {
            const testimoniId = params.testimoniId
            const response = await TestimoniService.deleteTestimoniById(testimoniId)
            return status(204)
        }
    )