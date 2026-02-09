import { client } from '$lib/api'
import { fail } from '@sveltejs/kit'

export const actions = {
    register: async ({ request }) => {
        const formData = await request.formData()
        const payload = {
            email: formData.get('email')?.toString() ?? '',
            username: formData.get('username')?.toString() ?? '',
            password: formData.get('password')?.toString() ?? '',
            role: formData.get('role')?.toString() ?? 'admin',
        }

        const { data, error } = await client.users.admin.register.post(payload)

        if (error) {
            const errorMessage = typeof error.value === 'string'
                ? error.value
                : JSON.stringify(error.value);

            return fail(error.status ?? 400, {
                error: true,
                message: error.value,
                values: payload
            });
        }
    }
}
