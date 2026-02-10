import { AuthError } from "../../errors/authError"
import { pool } from "../../utils/db"

export abstract class AuthService {

    static async addRefreshToken(token: string) {
        const date = new Date().toISOString()
        const tokenQuery = {
            text: 'insert into auth ("token", "created_at", "updated_at") values ($1, $2, $3)',
            values: [token, date, date]
        }
        const result = await pool.query(tokenQuery)
        if (!result) {
            throw new AuthError('Gagal menambahkan access token', 400)
        }
    }

    static async verifyRefreshToken(token: string) {
        const tokenQuery = {
            text: 'select "token" from auth where "token" = $1',
            values: [token]
        }

        const result = await pool.query(tokenQuery)
        if (!result.rows.length) {
            throw new AuthError('Token tidak valid', 400)
        }
    }

    static async deleteRefreshToken(token: string) {
        try {
            await this.verifyRefreshToken(token)
            const tokenQuery = {
                text: 'delete from auth where "token" = $1',
                values: [token]
            }
            await pool.query(tokenQuery)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

}