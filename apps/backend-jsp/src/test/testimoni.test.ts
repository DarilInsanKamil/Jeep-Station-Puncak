import { describe, expect, it } from "bun:test";
import { app } from "..";
import { treaty } from "@elysiajs/eden";

const api = treaty<app>('localhost:3000')

describe('Endpoint testimoni', () => {
    let testimoniId = '';
    it('Berhasil menambahkan data testimoni', async () => {
        const { data, error, status } = await api.testimoni.create.post({
            name: 'Daril',
            komentar: 'Layanannya mantap',
            rating: 2
        })
        expect(status).toBe(201)
        expect(data).toBeDefined()
        expect(error).toBeNull()

        if (data && 'id' in data) {
            testimoniId = data?.id
        } else {
            throw new Error("Gagal mendapatkan id")
        }
    })
    it('Berhasil mengambil semua data testimoni', async () => {
        const { data, error, status } = await api.testimoni.get()
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })
    it('Berhasil mengambil data testimoni berdasarkan id', async () => {
        const { data, error, status } = await api.testimoni({ testimoniId }).get()
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })
    it('Berhasil merubah data testimoni berdasarkan id', async () => {
        const { status, data, error } = await api.testimoni.edit({ testimoniId }).patch({
            name: 'Daril kamil',
            komentar: 'Layanannya mantap banget',
            rating: 5
        })
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })
    it('Berhasil menghapus data testimoni berdasarkan id', async () => {
        const { data, error, status } = await api.testimoni({ testimoniId }).delete()
        expect(status).toBe(204)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })
})