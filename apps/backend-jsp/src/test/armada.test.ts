import { treaty } from "@elysiajs/eden";
import type { app } from "..";
import { describe, it, expect, beforeAll } from "bun:test";

const api = treaty<app>('localhost:3000')

describe('Armada Endpoint', () => {

    let token = ''
    let armadaId = ''

    beforeAll(async () => {
        const { data, error } = await api.auth.login.post({
            email: 'user-1770109550034@mail.com',
            password: '2132daril'
        })

        if (!error && data?.accessToken) {
            token = data.accessToken
        }
    })

    it('Berhasil mendapatkan semua armada', async () => {
        const { data, error, status } = await api.armada.get()
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil mendapatkan armada dengan query parameter', async () => {
        const { data, error, status } = await api.armada.get({
            query: {
                page: 1,
                limit: 5,
                kapasitas: 6
            }
        })
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil membuat armada baru', async () => {
        const jpegHeader = new Uint8Array([
            0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46,
            0x00, 0x01, 0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00,
            0xFF, 0xD9  // JPEG end marker
        ])

        const validImageFile = new File([jpegHeader], 'test.jpg', {
            type: 'image/jpeg'
        })
        const { data, error, status } = await api.armada.create.post({
            nama_armada: 'Test Armada Jeep',
            harga_sewa: 500000,
            plat_nomor: 'B 1234 XYZ',
            kapasitas: 6,
            deskripsi: 'Test armada description',
            gambar_armada: validImageFile
        }, {
            headers: {
                cookie: `accessToken=${token}`
            }
        })
        expect(status).toBe(201)
        expect(error).toBeNull()
        expect(data).toBeDefined()
        if (data && 'id' in data) {
            armadaId = data.id as string
        }
    })

    it('Gagal membuat armada karena data invalid', async () => {
        const { data, error, status } = await api.armada.create.post({
            nama_armada: '',
            harga_sewa: 0,
            plat_nomor: '',
            kapasitas: 0,
            deskripsi: ''
        }, {
            headers: {
                cookie: `accessToken=${token}`
            }
        })
        expect(status).toBe(422)
    })

    it('Berhasil mendapatkan armada by ID', async () => {
        if (!armadaId) {
            // Skip if no armada created
            return
        }
        const { data, error, status } = await api.armada({ armadaId }).get()
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil edit data armada', async () => {
        if (!armadaId) {
            return
        }
        const { data, error, status } = await api.armada.edit({ armadaId }).patch({
            nama_armada: 'Updated Test Armada',
            harga_sewa: 600000,
            plat_nomor: 'B 5678 ABC',
            kapasitas: 7,
            deskripsi: 'Updated description'
        }, {
            headers: {
                cookie: `accessToken=${token}`
            }
        })
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil delete armada', async () => {
        if (!armadaId) {
            return
        }
        const { status } = await api.armada({ armadaId }).delete(
            undefined,
            {
                headers: {
                    cookie: `accessToken=${token}`
                }
            }
        )
        expect(status).toBe(204)
    })
})
