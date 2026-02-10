import { treaty } from "@elysiajs/eden";
import type { app } from "..";
import { describe, it, expect } from "bun:test";

const api = treaty<app>('localhost:3000')

describe('Auth Endpoint', () => {

    let accessToken = ''
    let refreshToken = ''

    it('Berhasil login dengan kredensial yang benar', async () => {
        const { data, error, status } = await api.auth.login.post({
            email: 'user-1770116099251@mail.com',
            password: '2132daril'
        })
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
        expect(data?.accessToken).toBeDefined()
        expect(data?.refreshToken).toBeDefined()

        if (data?.accessToken && data?.refreshToken) {
            accessToken = data.accessToken
            refreshToken = data.refreshToken
        }
    })

    it('Gagal login dengan email yang salah', async () => {
        const { data, error, status } = await api.auth.login.post({
            email: 'wrong@mail.com',
            password: '2132komang'
        })
        expect([400, 401, 404]).toContain(status)
        expect(error).toBeDefined()
    })
    it('Gagal login dengan password yang salah', async () => {
        const { data, error, status } = await api.auth.login.post({
            email: 'komang@mail.com',
            password: 'wrongpassword'
        })
        expect([400, 401]).toContain(status)
        expect(error).toBeDefined()
    })

    it('Gagal login dengan data invalid', async () => {
        const { data, error, status } = await api.auth.login.post({
            email: '',
            password: ''
        })
        expect(status).toBe(422)
    })

    it('Berhasil refresh token', async () => {
        if (!refreshToken) {
            return
        }
        const { data, error, status } = await api.auth.refresh.post({}, {
            headers: {
                cookie: `refreshToken=${refreshToken}`
            }
        })
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil logout', async () => {
        if (!accessToken || !refreshToken) {
            return
        }
        const { status } = await api.auth.logout.post({}, {
            headers: {
                cookie: `accessToken=${accessToken};refreshToken=${refreshToken}`
            }
        })
        expect(status).toBe(204)
    })
})
