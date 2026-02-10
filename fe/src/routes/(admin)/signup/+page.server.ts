import { client } from "$lib/api";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData()

    const payload = {
      email: formData.get('email')?.toString() ?? '',
      username: formData.get('username')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
      role: formData.get('role')?.toString() ?? ''
    }
    const { error } = await client.users.admin.register.post(payload)

    if (error) {
      return fail(error.status ?? 400, {
        error: true,
        message: typeof error.value === 'object' ? (error.value as any).message : error.value,
        values: payload
      })
    }

    return {
      success: true
    }
  }
}
