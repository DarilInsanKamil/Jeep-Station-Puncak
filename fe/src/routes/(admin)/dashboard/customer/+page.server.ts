import { client } from "$lib/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {

  const search = url.searchParams.get('search')?.toString() ?? '';

  const { data, error } = await client.customer.get({
    query: {
      search
    }
  })

  if (error) {
    console.error('Gagal memuat data: ', error)
  }

  return {
    success: true,
    data: data ?? [],
    searchParams: {search}
  }
}
