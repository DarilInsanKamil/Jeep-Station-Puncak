import Elysia, { status } from "elysia";
import { ArmadaError } from "../../errors/armadaError";
import { ArmadaService } from "./service";
import { ArmadaModel } from "./model";
import { adminGuard } from "../../utils/adminGuard";

export const armada = new Elysia({ prefix: '/armada' })
    .error({ ARMADA_ERROR: ArmadaError })
    .onError(({ code, error, set }) => {
        if (code === 'ARMADA_ERROR') {
            set.status = error.status;
            return error.toResponse();
        }
    })
    .get('/', async () => {
        const response = await ArmadaService.getAllArmada();
        return status(200, response);
    }, {
        response: {
            200: ArmadaModel.ArmadaResponse,
            400: ArmadaModel.ErrorResponse
        }
    })
    .get('/:armadaId', async ({ params }) => {
        const armadaId = params.armadaId;
        const response = await ArmadaService.getArmadaById(armadaId);
        return status(200, response);
    }, {
        response: {
            200: ArmadaModel.ArmadaResponseId,
            404: ArmadaModel.ErrorResponse
        }
    })


    .group('', (app) => app
        .use(adminGuard)
        .post('/create', async ({ body }) => {
            const response = await ArmadaService.addArmada(body);
            return status(201, {
                message: 'Berhasil menambahkan armada',
                id: response
            });
        }, {
            body: ArmadaModel.ArmadaPayload,
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
            response: {
                200: ArmadaModel.ArmadaSuccess,
                400: ArmadaModel.ErrorResponse
            }
        })
        .delete('/:armadaId', async ({ params }) => {
            const armadaId = params.armadaId;
            await ArmadaService.deleteArmadaById(armadaId);
            return status(204);
        })
    )