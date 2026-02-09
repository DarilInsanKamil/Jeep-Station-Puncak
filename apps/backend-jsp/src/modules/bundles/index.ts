import Elysia, { status, t } from "elysia";
import { BundlesService } from "./service";
import { BundlesModel } from "./model";

export const bundles = new Elysia({ prefix: '/bundles' })
    .post(
        '/create',
        async ({ body }) => {
            const response = await BundlesService.addBundles(body)
            return status(201, {
                message: 'Berhasil menambahkan data bundle',
                id: response
            })
        }, {
        body: BundlesModel.BundlesPayload,
        detail: {
            summary: 'POST bundle',
            tags: ['Bundle']
        },
        response: {
            201: BundlesModel.BudndlesSuccess,
            400: BundlesModel.ErrorResponse
        }
    }
    )
    
    .get(
        '/',
        async () => {
            const response = await BundlesService.getAllBundles()
            return status(200, response)
        }, {
        detail: {
            summary: 'GET bundle',
            tags: ['Bundle']
        },
        response: {
            200: BundlesModel.BundleResponse,
            400: BundlesModel.ErrorResponse
        }
    }
    )
    .get(
        '/:bundleId',
        async ({ params }) => {
            const bundleId = params.bundleId
            const response = await BundlesService.getBundleById(bundleId)
            return status(200, response)
        }, {
        detail: {
            summary: 'GET bundle by Id',
            tags: ["Bundle"]
        },
        response: {
            200: BundlesModel.BundleResponseById,
            400: BundlesModel.ErrorResponse
        }
    }
    )
    .patch(
        '/edit/:bundleId',
        async ({ body, params }) => {
            const bundleId = params.bundleId
            const response = await BundlesService.editBundleById(body, bundleId)
            return status(200, {
                message: 'Berhasil mengubah data bundle',
                id: response
            })
        }, {
        body: BundlesModel.EditBundlePayload,
        detail: {
            summary: 'PATCH bundle by Id',
            tags: ['Bundle']
        },
        response: {
            200: BundlesModel.BudndlesSuccess,
            400: BundlesModel.ErrorResponse
        }
    }
    )
    .delete(
        '/:bundleId',
        async ({ params }) => {
            const bundleId = params.bundleId
            const response = await BundlesService.deleteBundleById(bundleId)
            return status(204)
        }, {
        detail: {
            summary: 'DELETE bundle by Id',
            tags: ['Bundle']
        },
        response: {
            400: BundlesModel.ErrorResponse,
            404: BundlesModel.ErrorResponse
        }
    }
    )
    .patch(
        '/:bundleId/gambar',
        async ({ params, body }) => {
            const bundleId = params.bundleId
            const response = await BundlesService.updateGambarBundle(bundleId, body)
            return status(200, {
                message: 'Berhasil mengubah data gambar',
                id: response
            })
        },
        {
            body: t.File({ maxSize: '6m', type: 'image/*' }),
            response: {
                200: BundlesModel.BudndlesSuccess,
                400: BundlesModel.ErrorResponse
            },
            detail: {
                summary: 'PATCH gambar bundle by Id',
                tags: ["Bundle"]
            }
        }
    )