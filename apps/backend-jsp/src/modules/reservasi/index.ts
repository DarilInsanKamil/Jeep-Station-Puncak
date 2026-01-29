import Elysia, { status } from "elysia";

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