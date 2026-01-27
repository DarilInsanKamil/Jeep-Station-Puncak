import { treaty } from "@elysiajs/eden";
import { app } from "..";
import { describe, expect, it } from "bun:test";

const api = treaty<app>('localhost:3000')

describe('Endpoint Armada', () => {
    it('Berhasil menambahkan data armada', async () => {
        const { status, data, error } = await api.armada.create.post({
            nama_armada: 'Nissan Terano 2007',
            plat_nomor: 'F 3455 JVK',
            kapasitas: 2,
            deskripsi: 'Mobil nissan terano tahun 2007',
            gambar_armada: '/sakdj',
        })
        expect(status).toBe(201)
        expect(data).toBeDefined()
        expect(error).toBeNull()
    })
    it('Berhasil mengambil semua data armada', async () => {
        const { status, error } = await api.armada.get()

        expect(status).toBe(200)
        expect(error).toBeNull()
    })

    it('Berhasil mengambil data armada berdasarkan id', async () => {
        const armadaId = 'armada-KCOUiEj8np7sh-6S'

        const { status, error, data } = await api.armada({ armadaId }).get();

        expect(status).toBe(200)
        expect(error).toBeNull()
    })

    it('Berhasil merubah data armada berdasarkan id', async () => {
        const armadaId = 'armada-KCOUiEj8np7sh-6S'
        const { status, error, data } = await api.armada.edit({
            armadaId
        }).patch({
            nama_armada: 'string',
            plat_nomor: 'string',
            kapasitas: 4,
            deskripsi: 'string',
        });
        expect(status).toBe(200)
        expect(error).toBeNull()
    })
    it('Berhasil menghapus data armada berdasarkan id', async () => {
        const armadaId = 'armada-1_gqOaWHYcCIxHme'
        const { status, error } = await api.armada({ armadaId }).delete()
        expect(status).toBe(204)
        expect(error).toBeNull()
    })
})