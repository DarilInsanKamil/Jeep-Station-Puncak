import { treaty } from "@elysiajs/eden";
import type { app } from "..";
import { describe, it, expect } from "bun:test";

const api = treaty<app>('localhost:3000')

describe('Gallery Endpoint', () => {

    let galleryId = ''

    it('Berhasil upload gambar ke gallery', async () => {

        const jpegHeader = new Uint8Array([
            0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46,
            0x00, 0x01, 0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00,
            0xFF, 0xD9  // JPEG end marker
        ])

        const validImageFile = new File([jpegHeader], 'test.jpg', {
            type: 'image/jpeg'
        })

        const { data, error, status } = await api.gallery.upload.post({
            deskripsi: 'Test Gallery Image',
            gambar_url: validImageFile
        })
        expect(status).toBe(201)
        expect(error).toBeNull()
        expect(data).toBeDefined()
        if (data && 'id' in data) {
            galleryId = data.id as string
        }
    })

    it('Gagal upload gambar karena data invalid', async () => {
        const { data, error, status } = await api.gallery.upload.post({
            deskripsi: '',
            gambar_url: new File([''], 'empty.jpg', { type: 'image/jpeg' })
        })
        expect(status).toBe(422)
    })

    it('Berhasil mendapatkan semua gambar gallery', async () => {
        const { data, error, status } = await api.gallery.get()
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil mendapatkan gallery dengan limit', async () => {
        const { data, error, status } = await api.gallery.get({
            query: {
                limit: 10
            }
        })
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil delete gambar gallery', async () => {
        if (!galleryId) {
            return
        }
        const { status } = await api.gallery({ galleryId }).delete()
        expect(status).toBe(204)
    })
})
