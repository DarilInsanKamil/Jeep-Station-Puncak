import { t } from 'elysia';
export namespace CustomerModel {
    export const CustomerPayload = t.Object({
        nama_lengkap: t.String({ minLength: 1 }),
        email: t.String({ minLength: 1, format: 'email' }),
        no_hp: t.String({ minLength: 1 }),
    })
    export type CustomerPayload = typeof CustomerPayload.static

    export const CustomerResponseById = t.Object({
        nama_lengkap: t.String({ minLength: 1 }),
        email: t.String({ minLength: 1, format: 'email' }),
        no_hp: t.String({ minLength: 1 }),
        created_at: t.Date(),
        updated_at: t.Date()
    })
    export type CustomerResponseById = typeof CustomerResponseById.static

    export const GetCustomerQuery = t.Object({
        page: t.Optional(t.Numeric({ default: 1 })),
        limit: t.Optional(t.Numeric({ default: 1 })),
        search: t.Optional(t.String()),
    })
    export type GetCustomerQuery = typeof GetCustomerQuery.static;

    export const CustomerSuccess = t.Object({
        message: t.String({ minLength: 1 }),
        id: t.String({ minLength: 1 })
    })
    export type CustomerSuccess = typeof CustomerSuccess.static;

    export const ErrorResponse = t.Object({
        success: t.Boolean(),
        message: t.String()
    })
    export type ErrorResponse = typeof ErrorResponse.static
}