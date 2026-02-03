import { treaty } from "@elysiajs/eden";
import type { app } from "..";
import { describe, it, expect, beforeAll } from "bun:test";

const api = treaty<app>('localhost:3000')

describe('Reservasi Endpoint', () => {

    let token = ''
    let reservasiId = ''
    let validArmadaId = ''

    beforeAll(async () => {
        const { data, error } = await api.auth.login.post({
            email: 'user-1770109550034@mail.com',
            password: '2132daril'
        })

        if (!error && data?.accessToken) {
            token = data.accessToken
        }
        const armadaList = await api.armada.get()
        if (armadaList.data && armadaList.data.length > 0) {
            validArmadaId = armadaList.data[0].id
        } else {
            const newArmada = await api.armada.create.post({
                nama_armada: 'Test Armada for Reservasi',
                harga_sewa: 500000,
                plat_nomor: `B ${Date.now().toString().slice(-4)} RSV`,
                kapasitas: 6,
                deskripsi: 'Armada untuk testing reservasi'
            }, {
                headers: { cookie: `accessToken=${token}` }
            })
            if (newArmada.data && 'id' in newArmada.data) {
                validArmadaId = newArmada.data.id
            }
        }
    })

    it('Berhasil membuat reservasi baru', async () => {
        const uniqueEmail = `customer-${Date.now()}67@mail.com`
        const { data, error, status } = await api.reservasi.create.post({
            reservasi: {
                tanggal_mulai: '2026-03-01',
                tanggal_selesai: '2026-03-03',
                armada_id: validArmadaId,
                total_harga: '1500000',
                metode_pembayaran: 'transfer',
                jumlah_unit: 1
            },
            customer: {
                nama_lengkap: 'Test Customer',
                email: uniqueEmail,
                no_hp: '081234567890',
                alamat: 'Test Address'
            }
        })
        expect(status).toBe(201)
        expect(error).toBeNull()
        expect(data).toBeDefined()
        if (data && 'id' in data) {
            reservasiId = data.id as string
        }
    })

    it('Gagal membuat reservasi karena data invalid', async () => {
        const { data, error, status } = await api.reservasi.create.post({
            reservasi: {
                tanggal_mulai: '',
                tanggal_selesai: '',
                armada_id: '',
                total_harga: '',
                metode_pembayaran: '',
                jumlah_unit: 0
            },
            customer: {
                nama_lengkap: '',
                email: 'invalid-email',
                no_hp: '',
                alamat: ''
            }
        })
        expect(status).toBe(422)
    })

    it('Berhasil mendapatkan semua reservasi (requires admin)', async () => {
        const { data, error, status } = await api.reservasi.get({
            headers: {
                cookie: `accessToken=${token}`
            }
        })
        if (status !== 200) {
            console.error('Get reservasi failed:', { status, error })
        }
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil mendapatkan reservasi by ID (requires admin)', async () => {
        if (!reservasiId) {
            return
        }
        const { data, error, status } = await api.reservasi({ reservasiId }).get({
            headers: {
                cookie: `accessToken=${token}`
            }
        })
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })
})
