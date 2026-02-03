import { nanoid } from "nanoid";
import { ArmadaModel } from "./model";
import { pool } from "../../utils/db";
import { ArmadaError } from "../../errors/armadaError";
import { unlink } from "node:fs/promises";


export abstract class ArmadaService {

    static async addArmada({ nama_armada, plat_nomor, kapasitas, deskripsi, harga_sewa, gambar_armada }: ArmadaModel.ArmadaPayload) {
        const id = `armada-${nanoid(16)}`

        if (!gambar_armada) {
            throw new ArmadaError('Gambar armada is required', 400)
        }

        const fileName = `${id}-${Date.now()}.${gambar_armada.type.split('/')[1]}`
        const path = `public/cars/${fileName}`

        await Bun.write(path, gambar_armada)

        const coverUrl = `/public/cars/${fileName}`

        const armadaQuery = {
            text: 'insert into armada ("id", "nama_armada" ,"plat_nomor", "kapasitas", "deskripsi", "gambar_armada", "harga_sewa") values ($1, $2, $3, $4, $5, $6, $7) returning "id"',
            values: [id, nama_armada, plat_nomor, Number(kapasitas), deskripsi, coverUrl, harga_sewa]
        }
        const result = await pool.query(armadaQuery)

        if (!result.rows.length) {
            throw new ArmadaError('Gagal menambah data armada', 400)
        }
        return result.rows[0].id
    }

    static async getAllArmada({ page = 1, limit = 5, search, kapasitas }: ArmadaModel.GetArmadaQuery) {

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


        const armadaQuery = `select * from armada ${whereClause} order by created_at desc limit $${counter++} offset $${counter++}`
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

    static async editArmadaById({ nama_armada, plat_nomor, kapasitas, deskripsi, harga_sewa, gambar_armada }: ArmadaModel.ArmadaPayload, armadaId: string) {
      const oldData = await this.getArmadaById(armadaId)

      let coverUrl = oldData.gambar_armada;
          const updated_at = new Date().toISOString();

              // A. HAPUS GAMBAR LAMA (Cleanup)
              if (oldData.gambar_armada) {
                  // Sesuaikan path (hilangkan '/' di depan jika formatnya '/public/...')
                  const oldPath = oldData.gambar_armada.startsWith('/')
                      ? oldData.gambar_armada.slice(1)
                      : oldData.gambar_armada;

                  try {
                      const file = Bun.file(oldPath);
                      // Cek apakah file fisik benar-benar ada sebelum delete
                      if (await file.exists()) {
                          await unlink(oldPath);
                          console.log(`[File Deleted] Gambar lama dihapus: ${oldPath}`);
                      }
                  } catch (err) {
                      console.error(`Gagal menghapus file lama: ${oldPath}`, err);
                      // Lanjut saja, jangan throw error agar update data tetap jalan
                  }
              }


      if (!gambar_armada) {
          throw new ArmadaError('Gambar armada is required', 400)
      }
      const id = `armada-${nanoid(16)}`
      const fileName = `${id}-${Date.now()}.${gambar_armada.type.split('/')[1]}`
      const path = `public/cars/${fileName}`

      await Bun.write(path, gambar_armada)

      coverUrl = `/public/cars/${fileName}`

        const armadaQuery = {
            text: 'update armada set "nama_armada" = $1, "plat_nomor" = $2, "kapasitas" = $3, "deskripsi" = $4, "updated_at" = $5, "harga_sewa" = $6, "gambar_armada" = $7  where "id" = $8 returning id',
            values: [nama_armada, plat_nomor, kapasitas, deskripsi, updated_at, harga_sewa, coverUrl, armadaId]
        }
        const result = await pool.query(armadaQuery)
        if (!result.rows.length) {
            throw new ArmadaError('Gagal merubah data armada', 400)
        }
        return result.rows[0].id
    }

    static async deleteArmadaById(armadaId: string) {

        const armadaData = await this.getArmadaById(armadaId)

        if (armadaData.gambar_armada) {

            const filePath = armadaData.gambar_armada.startsWith('/')
                ? armadaData.gambar_armada.slice(1)
                : armadaData.gambar_armada;

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
