import { client } from "$lib/api";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { withAuth } from "$lib";

export const load: PageServerLoad = async () => {
  const { data, error } = await client.gallery.get()
  if (error) {
    console.error('Gagal memuat data: ', error)
  }
  return {
    success: true,
    data: data ?? []
  }
}


export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData()
    const galleryId = formData.get('id')?.toString() ?? '';

    const { error } = await withAuth(cookies, async (token) => {
      return await client.gallery({ galleryId }).delete(undefined, {
        headers: {
          authorization: `Bearer${token}`
        }
      })
    })

    if (error) {
      return fail(error.status ?? 400, {
        error: true,
        message: typeof error.value === 'object' ? (error.value as any).message : error.value,
      })
    }
    return {
      success: true
    }
  }
}
