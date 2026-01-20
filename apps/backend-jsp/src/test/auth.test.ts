import { treaty } from "@elysiajs/eden";
import { app } from "..";
import { beforeAll, describe, expect, it } from "bun:test";

const api = treaty<app>('localhost:3000')

describe('Authentication Endpoint', () => {
    it('Berhasil Login', async () => {
        const { status, error } = await api.auth.login.post({
            email: 'komang@mail.com',
            password: '2132komang'
        })

        expect(status).toBe(200)
        expect(error).toBeNull()
    })
    it('Gagal Login', async () => {
        const { status, error } = await api.auth.login.post({
            email: 'komangf@mail.com',
            password: '2132komang'
        })

        expect(status).toBe(401)
    })

})