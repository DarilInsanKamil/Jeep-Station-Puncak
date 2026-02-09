import Elysia, { status } from "elysia";
import { ArmadaError } from "../../errors/armadaError";
import { ArmadaService } from "./service";
import { ArmadaModel } from "./model";
import { adminGuard } from "../../utils/adminGuard";
import { redis } from "bun";

export const armada = new Elysia({ prefix: '/armada' })
    .error({ ARMADA_ERROR: ArmadaError })
    .onError(({ code, error, set }) => {
        if (code === 'ARMADA_ERROR') {
            set.status = error.status;
            return error.toResponse();
        }
    })
    .get('/', async ({ query }) => {
        const cacheKey = 'armada';
        const cached = await redis.get(cacheKey)

        if (cached) {
            return JSON.parse(cached)
        }

        const response = await ArmadaService.getAllArmada(query);

        await redis.set(cacheKey, JSON.stringify(response))
        await redis.expire(cacheKey, 60 * 60)

        return status(200, response);
    }, {
        query: ArmadaModel.GetArmadaQuery,
        detail: {
            summary: "GET all armada",
            tags: ['Armada']
        },
        response: {
            200: ArmadaModel.ArmadaResponse,
            400: ArmadaModel.ErrorResponse
        }
    })
    .get(
        '/tersedia',
        async ({ query }) => {
            const response = await ArmadaService.checkKetersediaanArmada(query)
            return status(200, response ?? [])
        }, {
        query: ArmadaModel.CheckAvailPayload,
        detail: {
            summary: 'GET check reservasi',
            tags: ["Armada"]
        },
    }
    )
    .get('/:armadaId', async ({ params }) => {
        const armadaId = params.armadaId;
        const response = await ArmadaService.getArmadaById(armadaId);
        return status(200, response);
    }, {
        detail: {
            summary: "GET armada by id",
            tags: ['Armada']
        },
        response: {
            200: ArmadaModel.ArmadaResponseId,
            404: ArmadaModel.ErrorResponse
        }
    })
    .group('', (app) => app
        .use(adminGuard)
        .post('/create', async ({ body }) => {
            const response = await ArmadaService.addArmada(body);

            const cacheKey = `armada:all`
            await redis.del(cacheKey)
            
            return status(201, {
                message: 'Berhasil menambahkan armada',
                id: response
            });
        }, {
            body: ArmadaModel.ArmadaPayload,
            detail: {
                summary: "POST armada",
                tags: ['Armada']
            },
            response: {
                201: ArmadaModel.ArmadaSuccess,
                400: ArmadaModel.ErrorResponse
            }
        })
        .patch('/edit/:armadaId', async ({ params, body }) => {
            const armadaId = params.armadaId;
            const response = await ArmadaService.editArmadaById(body, armadaId);
            return status(200, {
                message: 'Berhasil merubah data armada',
                id: response
            });
        }, {
            body: ArmadaModel.ArmadaPayload,
            detail: {
                summary: "PATCH armada by id",
                tags: ['Armada']
            },
            response: {
                200: ArmadaModel.ArmadaSuccess,
                400: ArmadaModel.ErrorResponse
            }
        },)
        .delete('/:armadaId', async ({ params }) => {
            const armadaId = params.armadaId;
            await ArmadaService.deleteArmadaById(armadaId);
            return status(204);
        }, {
            detail: {
                summary: "DELETE armada by id",
                tags: ['Armada']
            },
        })
        .patch(
            '/:armadaId/gambar',
            async ({ params, body }) => {
                const gambar = body.gambar
                const armadaId = params.armadaId
                const url = await ArmadaService.updateArmadaGambar(armadaId, gambar)
                return status(200, {
                    coverUrl: url,
                    message: 'Cover berhasil diperbarui'
                })
            }, {
            body: ArmadaModel.UploadGambarArmada,
            detail: {
                summary: "PATCH armada gambar armada by id",
                tags: ['Armada']
            },
        }
        )
    )
