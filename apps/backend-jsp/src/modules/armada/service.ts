import { nanoid } from "nanoid";
import { ArmadaModel } from "./model";
import { pool } from "../../utils/db";
import { ArmadaError } from "../../errors/armadaError";

export abstract class ArmadaService {
    static async addArmada({ nama_armada, plat_nomor, kapasitas, deskripsi, gambar_armada }: ArmadaModel.ArmadaPayload) {
        const id = `armada-${nanoid(16)}`

        if (!gambar_armada) {
            throw new ArmadaError('Gambar armada is required', 400)
        }

        const fileName = `${id}-${Date.now()}.${gambar_armada.type.split('/')[1]}`
        const path = `public/cars/${fileName}`

        await Bun.write(path, gambar_armada)

        const coverUrl = `/public/cars/${fileName}`

        const armadaQuery = {
            text: 'insert into armada ("id", "nama_armada", "plat_nomor", "kapasitas","deskripsi", "gambar_armada") values ($1, $2, $3, $4, $5, $6) returning "id"',
            values: [id, nama_armada, plat_nomor, Number(kapasitas), deskripsi, coverUrl]
        }
        const result = await pool.query(armadaQuery)

        if (!result.rows.length) {
            throw new ArmadaError('Gagal menambah data armada', 400)
        }
        return result.rows[0].id
    }

    static async getAllArmada({ page = 1, limit = 1, search, kapasitas }: ArmadaModel.GetArmadaQuery) {

        const offset = (page - 1) * limit;
        const conditions: string[] = [];
        const values: any[] = [];
        let counter = 1;

        if (search) {
            conditions.push(`nama_armada ILIKE $${counter++}`);
            values.push(`%${search}%`);
        }

        if (kapasitas) {
            conditions.push(`kapasitas = $${counter++}`)
            values.push(kapasitas)
        }

        const whereClause = conditions.length > 0 ? `where ${conditions.join('AND')}` : '';


        const armadaQuery = `select "id", "nama_armada", "plat_nomor", "kapasitas", "deskripsi", "gambar_armada" from armada ${whereClause} order by created_at desc limit $${counter++} offset $${counter++}`
        values.push(limit, offset)

        const result = await pool.query({
            text: armadaQuery,
            values: values
        });

        if (!result.rows.length) {
            throw new ArmadaError('Gagal mengambil data armada', 404)
        }

        return result.rows
    }

    static async getArmadaById(armadaId: string) {
        const armadaQuery = {
            text: 'select * from armada where "id" = $1',
            values: [armadaId]
        }
        const result = await pool.query(armadaQuery)
        if (!result.rows.length) {
            throw new ArmadaError('Gagal mengambil data armada dengan id tersebut', 404)
        }
        return result.rows[0]
    }

    static async editArmadaById({ nama_armada, plat_nomor, kapasitas, deskripsi }: ArmadaModel.ArmadaPayload, armadaId: string) {
        await this.getArmadaById(armadaId)

        const updated_at = new Date().toISOString()
        const armadaQuery = {
            text: 'update armada set "nama_armada" = $1, "plat_nomor" = $2, "kapasitas" = $3, "deskripsi" = $4, "updated_at" = $5  where "id" = $6 returning id',
            values: [nama_armada, plat_nomor, kapasitas, deskripsi, updated_at, armadaId]
        }
        const result = await pool.query(armadaQuery)
        if (!result.rows.length) {
            throw new ArmadaError('Gagal merubah data armada', 400)
        }
        return result.rows[0].id
    }
    static async deleteArmadaById(armadaId: string) {
        await this.getArmadaById(armadaId)
        const armadaQuery = {
            text: 'delete from armada where "id" = $1 returning id',
            values: [armadaId]
        }
        const result = await pool.query(armadaQuery)

        if (!result.rows.length) {
            throw new ArmadaError('Gagal menghapus data armada dengan id tersebut', 400)
        }
    }
    static async updateArmadaGambar(armadaId: string, gambar: File) {
        const fileName = `${armadaId}-${Date.now()}.${gambar.type.split('/')[1]}`
        const path = `public/cars/${fileName}`

        await Bun.write(path, gambar)

        const coverUrl = `/public/cars/${fileName}`
        const albumQuery = {
            text: 'UPDATE armada SET gambar_armada = $1 WHERE id = $2',
            values: [coverUrl, armadaId]
        }
        await pool.query(albumQuery)

        return coverUrl
    }
}

