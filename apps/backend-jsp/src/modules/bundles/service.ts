import { nanoid } from "nanoid";
import { BundlesModel } from "./model";
import { BundlesError } from "../../errors/bundlesError";
import { pool } from "../../utils/db";
import { unlink } from "node:fs/promises";

export abstract class BundlesService {
    static async addBundles(payload: BundlesModel.BundlesPayload) {
        const id = `bnd-${nanoid(16)}`

        if (!payload.gambar_bundle) {
            throw new BundlesError('Gambar bundle is required', 400)
        }

        const fileName = `${id}-${Date.now()}.${payload.gambar_bundle.type.split('/')[1]}`
        const path = `public/bundles/${fileName}`

        await Bun.write(path, payload.gambar_bundle)

        const coverUrl = `/public/bundles/${fileName}`
        const active: boolean = Boolean(payload.is_active)
        const bundlesQuery = {
            text: `insert into bundles ("id", "title", "deskripsi", "harga", "jumlah_unit", "gambar_bundles", "is_active","addOns")
            values ($1, $2, $3, $4, $5, $6, $7, $8) returning id`,
            values: [id, payload.title, payload.deskripsi, payload.harga, payload.jumlah_unit, coverUrl, active, payload.addOns]
        }

        const result = await pool.query(bundlesQuery)
        if (!result.rows.length) {
            throw new BundlesError('Gagal menambahkan data bundle', 400)
        }
        return result.rows[0].id
    }
    static async getAllBundles() {
        const bundlesQuery = {
            text: 'select * from bundles'
        }
        const result = await pool.query(bundlesQuery)

        return result.rows
    }
    static async getBundleById(bundleId: string) {
        const bundlesQuery = {
            text: 'select * from bundles where "id" = $1',
            values: [bundleId]
        }
        const result = await pool.query(bundlesQuery)
        if (!result.rows.length) {
            throw new BundlesError('Gagal mengambil data bundle berdasarkan id tersebut', 404)
        }
        return result.rows[0]
    }
    static async editBundleById(payload: BundlesModel.EditBundlePayload, bundleId: string) {
        await this.getBundleById(bundleId)

        const date = new Date().toISOString()
        const active: boolean = payload.is_active === 'true';
        const bundlesQuery = {
            text: `update bundles set "title" = $1,  "deskripsi" = $2,  "jumlah_unit" = $3, "harga" = $4,  
            "is_active" = $5, "addOns" = $6, "updated_at" = $7 where "id" = $8 returning id`,
            values: [payload.title, payload.deskripsi, payload.jumlah_unit, payload.harga, active, payload.addOns, date, bundleId]
        }
        const result = await pool.query(bundlesQuery)
        if (!result.rows.length) {
            throw new BundlesError('Gagal mengubah data berdasarkan id tersebut', 400)
        }
        return result.rows[0].id
    }
    static async deleteBundleById(bundleId: string) {
        const bundleData = await this.getBundleById(bundleId)

        if (bundleData.gambar_bundles) {

            const filePath = bundleData.gambar_bundles.startsWith('/')
                ? bundleData.gambar_bundles.slice(1)
                : bundleData.gambar_bundles;

            try {
                const file = Bun.file(filePath);
                if (await file.exists()) {
                    await unlink(filePath);
                    console.log(`[File Deleted] ${filePath}`);
                }
            } catch (err) {
                console.error(`Gagal menghapus file fisik: ${filePath}`, err);
            }
        }

        const armadaQuery = {
            text: 'delete from bundles where "id" = $1 returning id',
            values: [bundleId]
        }
        const result = await pool.query(armadaQuery)

        if (!result.rows.length) {
            throw new BundlesError('Gagal menghapus data bundle dengan id tersebut', 400)
        }
    }
    static async updateGambarBundle(bundleId: string, gambar: File) {
        const fileName = `${bundleId}-${Date.now()}.${gambar.type.split('/')[1]}`
        const path = `public/bundles/${fileName}`

        await Bun.write(path, gambar)

        const coverUrl = `/public/bundles/${fileName}`
        const bundlesQuery = {
            text: 'UPDATE bundles SET gambar_bundles = $1 WHERE id = $2',
            values: [coverUrl, bundleId]
        }
        await pool.query(bundlesQuery)

        return coverUrl
    }
}