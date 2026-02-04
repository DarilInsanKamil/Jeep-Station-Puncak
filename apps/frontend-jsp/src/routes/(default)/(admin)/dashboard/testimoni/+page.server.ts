import { client } from "$lib/api";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { withAuth } from "$lib/hooks";


export const actions = {
  delete: async ({ cookies, request }) => {
    const formData = await request.formData()
    const testimoniId = formData.get('id')?.toString() ?? '';

    const { error } = await withAuth(cookies, async (token) => {
      return await client.testimoni({ testimoniId }).delete(
        undefined,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
    })
  }
} satisfies Actions

export const load: PageServerLoad = async () => {
  const { data, error } = await client.testimoni.get()
  if (error) {
    console.error('Gagal load testimoni:', error);
  }
  return {
    data: data ?? [],
  }
}
