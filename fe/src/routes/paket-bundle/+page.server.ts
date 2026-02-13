import { client } from "$lib/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({cookies, url}) => {
  const search = url.searchParams.get('search')?.toString() ?? '';
  const page = Number(url.searchParams.get('page')?.toString() ?? '1');
  const limit = Number(url.searchParams.get('limit')?.toString() ?? '10');

  const { data, error } = await client.bundles.get({
    query: {
      search, page, limit
    }
  })

  if (error) {
    console.error('Gagal memuat data: ', error)
  }

  return {
    success: true,
    bundle: data ?? []
  }
}
