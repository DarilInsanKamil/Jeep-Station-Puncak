import Elysia, { status } from "elysia";
import { ReservasiModel } from "./model";
import { ReservasiService } from "./service";

export const reservasi = new Elysia({ prefix: '/reservasi' })
    .get(
        '/',
        async () => {
            return status(200, {
                name: 'Daril',
                NIM: '22011003005'
            })
        }, {
        detail: {
            summary: 'Get data reservasi',
            tags: ["Reservasi"]
        }
    }
    )
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