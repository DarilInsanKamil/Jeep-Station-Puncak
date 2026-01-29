import { nanoid } from 'nanoid'
import { UserModel } from './model'
import { pool } from '../../utils/db'
import bcrypt from 'bcrypt'
import { UserError } from '../../errors/userError'

export abstract class UserService {
    static async addUser({ email, username, password, role }: UserModel.UserPayload) {
        try {
            const id = `user-${nanoid(16)}`
            const hashedPassword = await bcrypt.hash(password, 10);

            const userQuery = {
                text: 'insert into users ("id", "email", "username", "password", "role") values ($1, $2, $3, $4, $5) returning "id"',
                values: [id, email, username, hashedPassword, role]
            }
            const result = await pool.query(userQuery)

            if (!result.rows.length) {
                throw new UserError("Gagal menambahkan user baru", 400)
            }
            return result.rows[0].id
        } catch (err: any) {
            if (err.code === '23505') {
                if (err.detail.includes('email')) {
                    throw new UserError('Email sudah terdaftar, gunakan email lain', 400)
                }
            }
            console.error(err)
            throw err
        }
    }

    static async addUserPublic({ email, username, password }: UserModel.UserPayload) {
        try {
            const id = `user-${nanoid(16)}`
            const hashedPassword = await bcrypt.hash(password, 10);

            const userQuery = {
                text: 'insert into users ("id", "email", "username", "password", "role") values ($1, $2, $3, $4, $5) returning "id"',
                values: [id, email, username, hashedPassword, "user"]
            }
            const result = await pool.query(userQuery)

            if (!result.rows.length) {
                throw new UserError("Gagal menambahkan user baru", 400)
            }
            return result.rows[0].id
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    static async verifyUser(userId: string) {
        const userQuery = {
            text: 'select "id" from users where "id" = $1',
            values: [userId]
        }
        const result = await pool.query(userQuery)
        if (!result.rows.length) {
            throw new UserError('User dengan id tersebut tidak ada', 404)
        }
        return result.rows[0].id
    }

    static async editUser(userId: string, { username, password, role }: UserModel.EditUserPayload) {
        await this.verifyUser(userId);
        const date = new Date().toISOString()
        const hashedPassword = await bcrypt.hash(password, 10);
        const userQuery = {
            text: 'update users set "username" = $1, "password" = $2, "role" = $3 "updated_at" = $4 where "id" = $5 returning "id"',
            values: [username, hashedPassword, role, date, userId]
        }

        const result = await pool.query(userQuery)

        if (!result.rows.length) {
            throw new UserError('Gagal memperbarui data user', 400)

        }
        return result.rows[0].id
    }

    static async verifyUserCredential({ email, password }: UserModel.verifyUserPayload) {
        const userQuery = {
            text: 'select "id", "password" from users where "email" = $1',
            values: [email]
        }

        const result = await pool.query(userQuery)

        if (!result.rows.length) {
            throw new UserError('Email atau password yang anda berikan salah', 401)
        }

        const { id, password: hashedPassword } = result.rows[0]
        const match = await bcrypt.compare(password, hashedPassword)

        if (!match) {
            throw new UserError('Email atau password yang anda berikan salah', 401)
        }
        return id
    }

    static async getUserById(userId: string) {
        const userQuery = {
            text: 'select "id", "email", "username", "role" from users where "id" = $1',
            values: [userId]
        }
        const result = await pool.query(userQuery)
        if (!result.rows.length) {
            throw new UserError('User dengan id tersebut tidak ada', 404)
        }
        return result.rows[0]
    }
}