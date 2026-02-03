import { client } from "$lib/api";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ url }) => {
  const search = url.searchParams.get('search') ?? '';
  const page = Number(url.searchParams.get('page') ?? '1');
  const limit = Number(url.searchParams.get('limit') ?? '10');
  const kapasitasParam = url.searchParams.get('kapasitas');
  const kapasitas = kapasitasParam ? Number(kapasitasParam) : undefined;
  const { data, error } = await client.armada.get({
    query: {
      page,
      limit,
      search,
      kapasitas,
    }
  })

  if (error) {
    console.error('Gagal load armada:', error);
  }

  return {
    data: data ?? [], // Pastikan return array kosong jika data null
    meta: {
      page,
      limit
    }
  }
}
