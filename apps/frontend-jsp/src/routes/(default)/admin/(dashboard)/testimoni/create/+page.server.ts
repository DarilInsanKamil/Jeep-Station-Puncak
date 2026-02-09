import { client } from "$lib/api";
import { fail, type Actions } from "@sveltejs/kit";

export const actions = {
  create: async ({ request }) => {
    const formData = await request.formData()

    const name = formData.get('name')?.toString() ?? '';
    const komentar = formData.get('komentar')?.toString() ?? '';
    const rating = Number(formData.get('rating')?.toString() ?? 0);
    const payload = {
      name, komentar, rating
    }
    const { data, error } = await client.testimoni.create.post(payload)

    if (error) {
      return fail(error.status ?? 400, {
        error: true,
        message: typeof error.value === 'object' ? (error.value as any).message : error.value,
        values: payload
      });
    }

    return {
      success: true
    }
  }
} satisfies Actions
