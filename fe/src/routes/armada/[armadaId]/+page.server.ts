import { client } from "$lib/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params, url}) => {
  const armadaId = params.armadaId
  const tglMulai = url.searchParams.get('tanggalMulai')?.toString() ?? '';
  const tglSelesai = url.searchParams.get('tanggalSelesai')?.toString() ?? '';

  const { data: armadaData, error } = await client.armada({ armadaId }).get()

  if (error) {
    console.error('Gagal memuat data: ', error)
  }

  return {
    armada: armadaData ?? null,
    date: {
      tglMulai, tglSelesai
    }
  }
}
