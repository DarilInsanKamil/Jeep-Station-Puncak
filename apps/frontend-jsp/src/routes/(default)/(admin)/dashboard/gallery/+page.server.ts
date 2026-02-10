import { client } from "$lib/api"
import { withAuth } from "$lib/hooks/index.js";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const actions = {
  delete: async ({ request, cookies }) => {
    const formData = await request.formData()
    const galleryId = formData.get('id')?.toString() ?? '';

    const { data, error } = await withAuth(cookies, async (token) => {
      return await client.gallery({ galleryId }).delete(
        undefined,
        {
          headers: {
            Authorization: `Bearer${token}`
          }
        }
      )
    })
    if (error) {
      return fail(400, {
        error: true,
        message: (error.value as any).message ?? error.value,
      })
    }
    return {
      success: true
    }
  }
}

export const load: PageServerLoad = async () => {
  const { data, error } = await client.gallery.get()

  if (error) {
    console.error('Gagal load data gallery', error)
    return { data: [] };
  }
  return {
    data: data ?? []
  }
}
