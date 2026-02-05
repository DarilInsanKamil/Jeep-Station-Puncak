import { client } from "$lib/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({url}) => {
  const search = url.searchParams.get('search') ?? '';
  const kapasitasParam = url.searchParams.get('kapasitas');
  const kapasitas = kapasitasParam ? Number(kapasitasParam) : undefined;

  const { data, error } = await client.armada.get({
    query: {
      search, kapasitas, page: 1, limit: 10
    }
  })

  if (error) {
    console.error('Gagal memuat data: ', error)
  }
  return {
    data: data ?? [],
    searchParams: { search },
  }
}
