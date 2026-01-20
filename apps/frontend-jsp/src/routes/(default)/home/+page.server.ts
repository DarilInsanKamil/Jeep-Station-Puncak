import { fail, redirect } from "@sveltejs/kit";
import { client } from "../../../lib/api";
import type { Actions, PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ request, fetch }) => {
    const { data } = await client.profile.get()
    return data?.data
}

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