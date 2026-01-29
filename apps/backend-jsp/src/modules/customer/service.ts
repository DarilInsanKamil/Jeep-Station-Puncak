import { nanoid } from "nanoid";
import { pool } from "../../utils/db";
import { CustomerModel } from "./model";
import { CustomerError } from "../../errors/customerError";

export abstract class CustomerService {

    static async addCustomer({ nama_lengkap, email, no_hp }: CustomerModel.CustomerPayload) {
        const id = `customer-${nanoid(16)}`
        const customerQuery = {
            text: `insert into customers ("id", "nama_lengkap", "email", "no_hp") 
            values ($1, $2, $3, $4) on conflict ("email") do update set "nama_lengkap" = excluded.nama_lengkap,
            "no_hp" = excluded.no_hp, "updated_at" = NOW() returning id`,
            values: [id, nama_lengkap, email, no_hp]
        }
        const result = await pool.query(customerQuery)
        if (!result.rows.length) {
            throw new CustomerError('Gagal menambah data customer', 400)
        }
        return result.rows[0].id

    }
    static async getCustomer({ limit = 5, page = 1, search = '' }: CustomerModel.GetCustomerQuery) {
        const offset = (page - 1) * limit;
        const conditions: string[] = [];
        const values: any[] = [];
        let counter = 1;

        if (search) {
            conditions.push(`nama_lengkap ILIKE $${counter++}`);
            values.push(`%${search}%`);
        }
        const whereClause = conditions.length > 0 ? `where ${conditions.join('AND')}` : '';

        const customerQuery = `
        select "id", "nama_lengkap", "email", "no_hp", "created_at" from customers ${whereClause}
        order by created_at desc limit $${counter++} offset $${counter++}
        `

        values.push(limit, offset)
        const result = await pool.query({
            text: customerQuery,
            values: values
        })

        return result.rows
    }
    static async getCustomerById(customerId: string) {
        const customerQuery = {
            text: 'select * from customers where "id" = $1',
            values: [customerId]
        }
        const result = await pool.query(customerQuery)
        if (!result.rows.length) {
            throw new CustomerError('Data customer tidak ada', 404)
        }
        return result.rows[0]
    }

    static async editCustomerById({ nama_lengkap, email, no_hp }: CustomerModel.CustomerPayload, customerId: string) {
        await this.getCustomerById(customerId)

        const customerQuery = {
            text: 'update customers set "nama_lengkap" = $1, "no_hp" = $2, "email" = $3, "updated_at" = NOW() where "id" = $4 returning id',
            values: [nama_lengkap, no_hp, email, customerId]
        }
        const result = await pool.query(customerQuery)
        if (!result.rows.length) {
            throw new CustomerError('Gagal merubah data customer', 400)
        }
        return result.rows[0].id
    }

    static async deleteCustomerById(customerId: string) {
        await this.getCustomerById(customerId)
        const customerQuery = {
            text: 'delete from customers where "id" = $1 returning id',
            values: [customerId]
        }
        const result = await pool.query(customerQuery)
        if (!result.rows.length) {
            throw new CustomerError('Gagal menghapus data customer', 400)
        }
    }


}