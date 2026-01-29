import { nanoid } from "nanoid"
import { pool } from "../../utils/db"
import { GalleryError } from "../../errors/galleryError"
import { GalleryModel } from "./model"

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
        await pool.query(galleryQuery)

        return coverUrl
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
    }
    static async deleteImageGallery(gambarId: string) {
        await this.verifyImageGallery(gambarId)
        const galleryQuery = {
            text: 'delete from gallery where "id" = $1',
            values: [gambarId]
        }
        const result = await pool.query(galleryQuery)
        if (!result.rows.length) {
            throw new GalleryError('Gagal menghapus gambar', 400)
        }
    }
}