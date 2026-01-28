import { treaty } from "@elysiajs/eden";
import { app } from "..";
import { beforeAll, describe, expect, it } from "bun:test";

const api = treaty<app>('localhost:3000')

describe('Endpoint Armada', () => {

    let token = '';
    let armadaId = '';

    beforeAll(async () => {
        const randomId = Math.floor(Math.random() * 1000)
        const adminPayload = {
            email: `admin${randomId}@mail.com`,
            username: `admin${randomId}`,
            password: '2132admin',
            role: 'admin'
        }

        await api.users.register.post(adminPayload)

        const { data: loginData, error: loginError } = await api.auth.login.post({
            email: adminPayload.email,
            password: adminPayload.password
        })

        if (loginError) throw new Error("Gagal login: " + JSON.stringify(loginError));

        if (loginData && 'accessToken' in loginData) {
            token = loginData.accessToken
        } else {
            throw new Error("Gagal mendapatkan accessToken")
        }
    })

    it('Berhasil menambahkan data armada', async () => {
        const { status, data, error } = await api.armada.create.post({
            nama_armada: 'Nissan Terano 2007',
            plat_nomor: 'F 3455 JVK',
            kapasitas: 2,
            deskripsi: 'Mobil nissan terano tahun 2007',
            gambar_armada: new File([''], 'sakdj', { type: 'image/jpeg' }),
        }, {
            headers: {
                cookie: `accessToken=${token}`
            }
        })
        expect(status).toBe(201)
        expect(data).toBeDefined()
        expect(error).toBeNull()

        if (data && 'id' in data) {
            armadaId = data?.id
        } else {
            throw new Error("Gagal mendapatkan id")
        }

    })
    it('Berhasil mengambil semua data armada', async () => {
        const { status, error } = await api.armada.get()

        expect(status).toBe(200)
        expect(error).toBeNull()
    })

    it('Berhasil mengambil data armada berdasarkan id', async () => {

        const { status, error, data } = await api.armada({ armadaId }).get();

        expect(status).toBe(200)
        expect(error).toBeNull()
    })

    it('Berhasil merubah data armada berdasarkan id', async () => {
        const { status, error, data } = await api.armada.edit({
            armadaId
        }).patch({
            nama_armada: 'string',
            plat_nomor: 'string',
            kapasitas: 4,
            deskripsi: 'string',
        }, {
            headers: {
                cookie: `accessToken=${token}`
            }
        });
        expect(status).toBe(200)
        expect(error).toBeNull()
    })
    // it('Berhasil menghapus data armada berdasarkan id', async () => {

    //     const { status, error } = await api.armada({ armadaId }).delete(
    //         undefined,
    //         {
    //             headers: {
    //                 cookie: `accessToken=${token}`
    //             }
    //         })
    //     expect(status).toBe(204)
    //     expect(error).toBeNull()
    // })
})