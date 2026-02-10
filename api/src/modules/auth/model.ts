import { t } from 'elysia'

export namespace AuthModel {
    export const AuthPayload = t.Object({
        email: t.String({ format: 'email', minLength: 1 }),
        password: t.String({ minLength: 1 })
    })

    export type AuthPayload = typeof AuthPayload.static
    
    export const AuthSuccess = t.Object({
        accessToken: t.String({minLength: 1}),    
        refreshToken: t.String({minLength: 1}),    
    })

    export const ErrorResponse = t.Object({
        success: t.Boolean(),
        message: t.String()
    })
    export type ErrorResponse = typeof ErrorResponse.static


}