import Elysia, { status } from "elysia";
import { ReservasiModel } from "./model";
import { ReservasiService } from "./service";
import { adminGuard } from "../../utils/adminGuard";

export const reservasi = new Elysia({ prefix: '/reservasi' })
    .post(
        '/create',
        async ({ body }) => {
            const response = await ReservasiService.addReservasi(body)
            return status(201, response)
        }, {
        body: ReservasiModel.ReservasiPayload,
        detail: {
            summary: 'Post data reservasi',
            tags: ["Reservasi"]
        }
    }
    )
    .use(adminGuard)
    .get(
        '/',
        async ({ auth }) => {
            const role = auth.role
            const response = await ReservasiService.getAllReservasi(role)
            return status(200, response)
        }, {
        detail: {
            summary: 'GET all data reservasi',
            tags: ['Reservasi']
        },
        response: {
            200: ReservasiModel.ReservasiResponse,
            400: ReservasiModel.ErrorResponse
        }
    }
    )
    .get(
        '/:reservasiId',
        async ({ params }) => {
            const reservasiId = params.reservasiId
            const response = await ReservasiService.getReservasiById(reservasiId)
            return status(200, response)
        }, {
        response: {
            200: ReservasiModel.ReservasiResponseById,
            400: ReservasiModel.ErrorResponse
        },
        detail: {
            summary: 'GET reservasi by Id',
            tags: ['Reservasi']
        }
    }
    )