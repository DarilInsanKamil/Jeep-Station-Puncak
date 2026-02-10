import { client } from "$lib/api";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({request, cookies}) => {
    const formData = await request.formData()

    const payload = {
      email: formData.get('email')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? ''
    }

    const { data, error } = await client.auth.login.post(payload)

    if (data?.accessToken && data?.refreshToken) {
        // 1. Set Access Token (Umur pendek, misal 15 menit)
        cookies.set('accessToken', data.accessToken, {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 15,
            secure: process.env.NODE_ENV === 'production'
        });

        // 2. Set Refresh Token (Umur panjang, misal 7 hari)
        cookies.set('refreshToken', data.refreshToken, {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            secure: process.env.NODE_ENV === 'production'
        });
    }

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
    redirect(303, '/dashboard')
  }
}
