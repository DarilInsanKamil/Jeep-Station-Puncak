import { treaty } from "@elysiajs/eden";
import type { app } from "..";
import { describe, it, expect } from "bun:test";

const api = treaty<app>('localhost:3000')

describe('Testimoni Endpoint', () => {

    let testimoniId = ''

    it('Berhasil membuat testimoni baru', async () => {
        const { data, error, status } = await api.testimoni.create.post({
            name: 'Test User',
            komentar: 'Pelayanan sangat memuaskan!',
            rating: 5
        })
        expect(status).toBe(201)
        expect(error).toBeNull()
        expect(data).toBeDefined()
        if (data && 'id' in data) {
            testimoniId = data.id as string
        }
    })

    it('Gagal membuat testimoni karena data invalid', async () => {
        const { data, error, status } = await api.testimoni.create.post({
            name: '',
            komentar: '',
            rating: 0
        })
        expect(status).toBe(422)
    })

    it('Berhasil mendapatkan semua testimoni', async () => {
        const { data, error, status } = await api.testimoni.get()
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil mendapatkan testimoni by ID', async () => {
        if (!testimoniId) {
            return
        }
        const { data, error, status } = await api.testimoni({ testimoniId }).get()
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil edit data testimoni', async () => {
        if (!testimoniId) {
            return
        }
        const { data, error, status } = await api.testimoni.edit({ testimoniId }).patch({
            name: 'Updated Test User',
            komentar: 'Updated comment',
            rating: 4
        })
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil delete testimoni', async () => {
        if (!testimoniId) {
            return
        }
        const { status } = await api.testimoni({ testimoniId }).delete()
        expect(status).toBe(204)
    })
})
