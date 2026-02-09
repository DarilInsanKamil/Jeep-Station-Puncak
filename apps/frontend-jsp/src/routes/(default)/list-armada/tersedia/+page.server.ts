import { client } from '$lib/api.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const search = url.searchParams.get('search') ?? '';
  const kapasitas = Number(url.searchParams.get('kapasitas') ?? '2');
  const tglMulai = url.searchParams.get('tglMulai') ?? '';
  const tglSelesai = url.searchParams.get('tglSelesai') ?? '';

  const { data, error } = await client.armada.tersedia.get({
    query: {
      tglMulai, tglSelesai, kapasitas,
    }
  })

  if (error) {
    console.error('Gagal memuat data: ', error)
  }
  return {
    success: true,
    data: data ?? [],
    tanggal: { tglMulai, tglSelesai },
    searchParams: { search }
  }
}
