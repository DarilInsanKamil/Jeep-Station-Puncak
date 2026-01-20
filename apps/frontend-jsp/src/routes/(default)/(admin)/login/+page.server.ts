import { fail, redirect, type Actions } from "@sveltejs/kit";
import { client } from "../../../../lib/api";


export const actions = {
    default: async ({ request }: { request: Request }) => {
        const formData = await request.formData()
        const payload = {
            email: formData.get('email')?.toString() ?? '',
            username: formData.get('username')?.toString() ?? '',
            password: formData.get('password')?.toString() ?? '',
            role: formData.get('role')?.toString() ?? 'user'
        };
        const { data, error } = await client.users.register.post(payload)

        if (error) {
            return fail(error.status ?? 400, {
                error: true,
                message: error.value,
                values: payload
            });
        }
        redirect(303, '/login')
    }
} satisfies Actions