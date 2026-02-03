import { treaty } from "@elysiajs/eden";
import type { app } from "..";
import { describe, it, expect } from "bun:test";

const api = treaty<app>('localhost:3000')

describe('Customer Endpoint', () => {

    let customerId = ''

    it('Berhasil membuat customer baru', async () => {
        const { data, error, status } = await api.customer.create.post({
            nama_lengkap: 'Test Customer',
            email: 'testcustomer@mail.com',
            no_hp: '081234567890',
            alamat: 'Test Address'
        })
        expect(status).toBe(201)
        expect(error).toBeNull()
        expect(data).toBeDefined()
        if (data && 'id' in data) {
            customerId = data.id as string
        }
    })

    it('Gagal membuat customer karena data invalid', async () => {
        const { data, error, status } = await api.customer.create.post({
            nama_lengkap: '',
            email: 'invalid-email',
            no_hp: '',
            alamat: ''
        })
        expect(status).toBe(422)
    })

    it('Berhasil mendapatkan semua customer', async () => {
        const { data, error, status } = await api.customer.get()
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil mendapatkan customer dengan query parameter', async () => {
        const { data, error, status } = await api.customer.get({
            query: {
                page: 1,
                limit: 10,
                search: 'test'
            }
        })
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil mendapatkan customer by ID', async () => {
        if (!customerId) {
            return
        }
        const { data, error, status } = await api.customer({ customerId }).get()
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil edit data customer', async () => {
        if (!customerId) {
            return
        }
        const { data, error, status } = await api.customer({ customerId }).edit.patch({
            nama_lengkap: 'Updated Test Customer',
            email: 'updatedcustomer@mail.com',
            no_hp: '089876543210',
            alamat: 'Updated Address'
        })
        expect(status).toBe(200)
        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    it('Berhasil delete customer', async () => {
        if (!customerId) {
            return
        }
        const { status } = await api.customer({ customerId }).delete()
        expect(status).toBe(204)
    })
})
