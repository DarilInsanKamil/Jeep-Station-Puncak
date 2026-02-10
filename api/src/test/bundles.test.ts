import { treaty } from "@elysiajs/eden";
import type { app } from "..";
import { describe, it, expect, beforeAll } from "bun:test";

const api = treaty<app>('localhost:3000')

describe('Bundles Endpoint', () => {

    let token = ''
    let bundleId = ''

    beforeAll(async () => {
        const { data, error } = await api.auth.login.post({
            email: 'daril@mail.com',
            password: '2132daril'
        })

        if (!error && data?.accessToken) {
            token = data.accessToken
        }
    })

    it('Berhasil membuat bundle baru', async () => {
        const jpegHeader = new Uint8Array([
            0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46,
            0x00, 0x01, 0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00,
            0xFF, 0xD9  // JPEG end marker
        ])

        const validImageFile = new File([jpegHeader], 'test.jpg', {
            type: 'image/jpeg'
        })
        const arrAddOns = ["Driver", "BBM", "Parkir"]

        const { data, error, status } = await api.bundles.create.post({
            addOns: JSON.stringify(arrAddOns),
            title: 'Test Bundle Paket Wisata',
            deskripsi: 'Test bundle description',
            harga: '1000000',
            jumlah_unit: 2,
            gambar_bundle: validImageFile,
            is_active: 'true'
        })
        if (status !== 201) {
            console.error('Bundle creation failed:', { status, error })
        }

        expect(status).toBe(201)
        expect(error).toBeNull()
        expect(data).toBeDefined()

        if (data && 'id' in data) {
            bundleId = data.id as string
        }
    })

    it('Gagal membuat bundle karena data invalid', async () => {
        const { data, error, status } = await api.bundles.create.post({
            addOns: '',
            title: '',
            deskripsi: '',
            harga: '',
            jumlah_unit: 0,
            gambar_bundle: new File([''], 'empty.jpg', { type: 'image/jpeg' }),
            is_active: ''
        })
        expect(status).toBe(422)
    })

    it('Berhasil mendapatkan semua bundles', async () => {
        const { data, error, status } = await api.bundles.get()
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil mendapatkan bundle by ID', async () => {
        if (!bundleId) {
            return
        }
        const { data, error, status } = await api.bundles({ bundleId }).get()
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil edit data bundle', async () => {
        if (!bundleId) {
            return
        }
        const { data, error, status } = await api.bundles.edit({ bundleId }).patch({
            title: 'Updated Test Bundle',
            deskripsi: 'Updated description',
            harga: '1200000',
            jumlah_unit: 3
        })
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil delete bundle', async () => {
        if (!bundleId) {
            return
        }
        const { status } = await api.bundles({ bundleId }).delete()
        expect(status).toBe(204)
    })
})
