import { withAuth } from "$lib";
import { client } from "$lib/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({cookies}) => {
  const { data, error } = await withAuth(cookies, async (token) => {
    return await client.reservasi.get({
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  })

  if (error) {
    console.error('Gagal memuat data: ', error)
  }
  return {
    success: true,
    reservasi: data ?? []
  }
}
