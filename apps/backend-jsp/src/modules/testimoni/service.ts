import { nanoid } from "nanoid";
import { pool } from "../../utils/db";
import { TestimoniError } from "../../errors/testimoniError";
import { TestimoniModel } from "./model";

export abstract class TestimoniService {
    static async addTestimoni({ name, komentar, rating }: TestimoniModel.TestimoniPayload) {
        const id = `testi-${nanoid(16)}`
        const testiQuery = {
            text: 'insert into testimoni ("id", "name", "komentar", "rating") values ($1, $2, $3, $4) returning id',
            values: [id, name, komentar, rating]
        }
        const result = await pool.query(testiQuery)
        if (!result.rows.length) {
            throw new TestimoniError('Gagal menambahkan testimoni', 400)
        }
        return result.rows[0].id
    }
    static async getAllTestimoni() {
        const testiQuery = {
            text: 'select * from testimoni'
        }
        const result = await pool.query(testiQuery)
        if (!result.rows.length) {
            throw new TestimoniError('Gagal mengambil data testimoni', 400)
        }
        return result.rows
    }
    static async getTestimoniById(testimoniId: string) {
        const testiQuery = {
            text: 'select * from testimoni where "id" = $1',
            values: [testimoniId]
        }
        const result = await pool.query(testiQuery)
        if (!result.rows.length) {
            throw new TestimoniError('Gagal mengambil data dengan id tersebut', 404)
        }
        return result.rows[0]
    }
    static async editTestimoniById({ name, rating, komentar }: TestimoniModel.TestimoniPayload, testimoniId: string) {
        await this.getTestimoniById(testimoniId)
        const date = new Date().toISOString()
        const testiQuery = {
            text: 'update testimoni set "name" = $1, "rating" = $2, "komentar" = $3, "updated_at" = $4 where "id" = $5 returning id',
            values: [name, rating, komentar, date, testimoniId]
        }
        const result = await pool.query(testiQuery)
        if (!result.rows.length) {
            throw new TestimoniError('Gagal merubah data testimoni', 400)
        }
        return result.rows[0].id
    }
    static async deleteTestimoniById(testimoniId: string) {
        await this.getTestimoniById(testimoniId)
        const testiQuery = {
            text: 'delete from testimoni where "id" = $1 returning id',
            values: [testimoniId]
        }
        const result = await pool.query(testiQuery)
        if (!result.rows.length) {
            throw new TestimoniError('Gagal menghapus data testimoni', 400)
        }
    }
}