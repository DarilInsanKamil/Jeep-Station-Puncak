import { treaty } from "@elysiajs/eden";
import type { app } from "..";
import { describe, it, expect, beforeAll } from "bun:test";

const api = treaty<app>('localhost:3000')

describe('User Endpoint', () => {

    let token = ''

    beforeAll(async () => {
        const { data, error } = await api.auth.login.post({
            email: 'user-1770115580379@mail.com',
            password: '2132daril'
        })

        if (!error && data?.accessToken) {
            token = data.accessToken
        }
    })

    it('Gagal membuat user baru karena data invalid', async () => {
        const { data, error, status } = await api.users.register.post({
            email: 'komang@mail.com',
            username: '',
            password: '2132komang',
            role: ''
        }, {
            headers: {
                cookie: `accessToken=${token}`
            }
        })
        expect(status).toBe(422)
    })

    it('Berhasil membuat user baru (admin)', async () => {
        const uniqueEmail = `user-${Date.now()}@mail.com`
        const uniqueUsername = `user${Date.now()}`

        const { data, error, status } = await api.users.admin.register.post({
            email: uniqueEmail,
            username: uniqueUsername,
            password: '2132daril',
            role: 'admin'
        }, {
            headers: {
                cookie: `accessToken=${token}`
            }
        })
        expect(status).toBe(201)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil edit data user', async () => {
        const { data, error, status } = await api.users.edit.patch(
            {
                username: 'komang anjay',
                password: '2132daril',
                role: 'admin'
            },
            {
                headers: {
                    cookie: `accessToken=${token}`
                }
            }
        )
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()

    })
})