import { t } from 'elysia'
export namespace TestimoniModel {
    export const TestimoniPayload = t.Object({
        name: t.String({ minLength: 1 }),
        komentar: t.String(({ minLength: 1 })),
        rating: t.Number()
    })
    export type TestimoniPayload = typeof TestimoniPayload.static


    export const TestimoniResponse = t.Array(
        t.Object({
            id: t.String({ minLength: 1 }),
            name: t.String({ minLength: 1 }),
            komentar: t.String(({ minLength: 1 })),
            rating: t.Number(),
            created_at: t.Date(),
            updated_at: t.Date(),
        })
    )
    export type TestimoniResponse = typeof TestimoniResponse.static;
    
    export const TestimoniResponseId = t.Object({
        id: t.String({ minLength: 1 }),
        name: t.String({ minLength: 1 }),
        komentar: t.String(({ minLength: 1 })),
        rating: t.Number(),
        created_at: t.Date(),
        updated_at: t.Date(),
    })

    export type TestimoniResponseId = typeof TestimoniResponseId.static

    export const TestimoniSuccess = t.Object({
        message: t.String({ minLength: 1 }),
        id: t.String({ minLength: 1 })
    })
    export type TestimoniSuccess = typeof TestimoniSuccess.static;

    export const ErrorResponse = t.Object({
        success: t.Boolean(),
        message: t.String()
    })
    export type ErrorResponse = typeof ErrorResponse.static
}