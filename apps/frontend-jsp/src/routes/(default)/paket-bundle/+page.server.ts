import { client } from "$lib/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const {data, error} = await client.bundles.get()

  if (error) {
    console.log('Gagal memuat data: ', error)
  }
  return {
    success: true,
    bundles: data ?? []
  }
}
