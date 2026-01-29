import Elysia, { status, t } from "elysia";
import { CustomerService } from "./service";
import { CustomerModel } from "./model";
import { CustomerError } from "../../errors/customerError";

export const customer = new Elysia({ prefix: '/customer' })
    .error({ CUSTOMER_ERROR: CustomerError })
    .onError(({ code, error, set }) => {
        if (code === 'CUSTOMER_ERROR') {
            set.status = error.status;
            return error.toResponse();
        }
    })
    .post(
        '/create',
        async ({ body }) => {
            const response = await CustomerService.addCustomer(body)
            return status(201, {
                message: 'Berhasil menambahkan data customer',
                id: response
            })
        }, {
        body: CustomerModel.CustomerPayload,
        detail: {
            summary: 'Post Customer',
            tags: ['Customer']
        },
        response: {
            201: CustomerModel.CustomerSuccess,
            400: CustomerModel.ErrorResponse
        }
    }
    )
    .get(
        '/',
        async ({ query }) => {
            const response = await CustomerService.getCustomer(query)
            return status(200, response)
        }, {
        query: CustomerModel.GetCustomerQuery,
        detail: {
            summary: 'Get Customer',
            tags: ['Customer']
        },
    }
    )
    .get(
        '/:customerId',
        async ({ params }) => {
            const customerId = params.customerId
            const response = await CustomerService.getCustomerById(customerId)
            return status(200, response)
        }, {
        detail: {
            summary: 'Get customer by id',
            tags: ['Customer']
        },
        response: {
            200: CustomerModel.CustomerResponseById,
            404: CustomerModel.ErrorResponse
        }
    }
    )
    .patch(
        '/:customerId/edit',
        async ({ params, body }) => {
            const customerId = params.customerId
            const response = await CustomerService.editCustomerById(body, customerId)
            return status(200, {
                message: 'Berhasil merubah data customer',
                id: response
            })
        }, {
        body: CustomerModel.CustomerPayload,
        response: {
            200: CustomerModel.CustomerSuccess,
            400: CustomerModel.ErrorResponse
        },
        detail: {
            summary: "Edit data customer",
            tags: ["Customer"]
        }
    }
    )
    .delete(
        '/:customerId',
        async ({ params }) => {
            const customerId = params.customerId
            await CustomerService.deleteCustomerById(customerId)
            return status(204)
        }, {
        response: {
            400: CustomerModel.ErrorResponse
        },
        detail: {
            summary: 'Delete data Customer',
            tags: ['Customer']
        }
    }
    )