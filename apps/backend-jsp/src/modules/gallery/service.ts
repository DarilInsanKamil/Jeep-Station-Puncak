import { nanoid } from "nanoid"
import { pool } from "../../utils/db"
import { GalleryError } from "../../errors/galleryError"
import { GalleryModel } from "./model"
import { unlink } from "node:fs/promises";


export abstract class GalleryService {
    static async uploadGambar({ deskripsi, gambar_url }: GalleryModel.GalleryPayload) {
        const randomId = `gallery-${nanoid(16)}`
        const fileName = `${randomId}-${Date.now()}.${gambar_url.type.split('/')[1]}`
        const path = `public/gallery/${fileName}`

        await Bun.write(path, gambar_url)

        const coverUrl = `/public/gallery/${fileName}`
        const galleryQuery = {
            text: 'insert into gallery ("id", "deskripsi", "gambar_url") values ($1, $2, $3) returning "id"',
            values: [randomId, deskripsi, coverUrl]
        }
        const result = await pool.query(galleryQuery)
        if (!result.rows.length) {
            throw new GalleryError('Gagl menambah data gallery', 400)
        }
        return result.rows[0].id
    }

    static async getAllImageGallery(limit: number) {
        const galleryQuery = {
            text: 'select * from gallery order by created_at desc limit $1',
            values: [limit]
        }
        const result = await pool.query(galleryQuery)
        if (!result.rows.length) {
            throw new GalleryError('Gagal mengambil gambar', 400)
        }
        return result.rows
    }

    static async verifyImageGallery(gambarId: string) {
        const galleryQuery = {
            text: 'select id from gallery where "id" = $1',
            values: [gambarId]
        }
        const result = await pool.query(galleryQuery)
        if (!result.rows.length) {
            throw new GalleryError('Gagal mengambil gambar, id tidak ada', 404)
        }
        return result.rows[0]
    }

    static async deleteImageGallery(gambarId: string) {
        const galleryData = await this.verifyImageGallery(gambarId)

        if (galleryData.gambar_url) {

            const filePath = galleryData.gambar_url.startsWith('/')
                ? galleryData.gambar_url.slice(1)
                : galleryData.gambar_url;

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

        const galleryQuery = {
            text: 'delete from gallery where "id" = $1 returning id',
            values: [gambarId]
        }
        const result = await pool.query(galleryQuery)
        if (!result.rows.length) {
            throw new GalleryError('Gagal menghapus gambar', 400)
        }
    }
}