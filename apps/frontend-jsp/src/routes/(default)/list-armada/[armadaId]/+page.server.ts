import type { PageServerLoad } from './$types';
import { client } from "$lib/api";

export const load: PageServerLoad = async ({ params, url }) => {
  const armadaId = params.armadaId

  const tanggalMulai = url.searchParams.get('tglMulai') ?? '';
  const tanggalSelesai = url.searchParams.get('tglSelesai') ?? '';

  const { data, error: apiError } = await client.armada({ armadaId }).get()
  if (apiError || !data) {
      console.error('Gagal memuat data:', apiError);
      throw Error('Data armada tidak ditemukan');
    }
  return {
    armada: data ?? [],
    tanggal: {
      start: tanggalMulai,
      end: tanggalSelesai
    }
  }
}
