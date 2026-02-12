import { t } from "elysia";

export namespace UserModel {
    export const UserPayloadPublic = t.Object({
        email: t.String({ format: 'email', minLength: 1 }),
        username: t.String({ minLength: 1 }),
        password: t.String({ minLength: 1 }),
    })

    export type UserPayloadPublic = typeof UserPayloadPublic.static;
    
    export const UserPayload = t.Object({
        email: t.String({ format: 'email', minLength: 1 }),
        username: t.String({ minLength: 1 }),
        password: t.String({ minLength: 1 }),
        role: t.String({ minLength: 1 })
    })

    export type UserPayload = typeof UserPayload.static;

    export const EditUserPayload = t.Object({
        username: t.String({ minLength: 1 }),
        password: t.String({ minLength: 1 }),
        role: t.String({ minLength: 1 })
    })

    export type EditUserPayload = typeof EditUserPayload.static;

    export const verifyUserPayload = t.Object({
        email: t.String({ format: 'email', minLength: 1 }),
        password: t.String({ minLength: 1 })
    })

    export type verifyUserPayload = typeof verifyUserPayload.static;

    export const UserSuccess = t.Object({
        message: t.String({ minLength: 1 }),
        id: t.String({ minLength: 1 })
    })
    export type UserSuccess = typeof UserSuccess.static;

    export const ErrorResponse = t.Object({
        success: t.Boolean(),
        message: t.String()
    })
    export type ErrorResponse = typeof ErrorResponse.static

    export const UserResponse = t.Object({
        id: t.String(),
        email: t.String(),
        username: t.String(),
        role: t.String()
    })
    export type UserResponse = typeof UserResponse.static

    export const MeResponse = t.Object({
        success: t.Boolean(),
        response: UserResponse
    })
    export type MeResponse = typeof MeResponse.static
}