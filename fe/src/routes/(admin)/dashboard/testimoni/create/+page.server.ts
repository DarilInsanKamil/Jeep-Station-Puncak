import { client } from "$lib/api"
import { fail, type Actions } from "@sveltejs/kit"

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData()

    const payload = {
      name: formData.get('name')?.toString() ?? '',
      rating: Number(formData.get('rating')?.toString() ?? ''),
      komentar: formData.get('komentar')?.toString() ?? ''
    }

    const { error } = await client.testimoni.create.post(payload)

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
