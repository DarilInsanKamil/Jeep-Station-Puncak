import { client } from "$lib/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({url}) => {
    const tanggalMulai = url.searchParams.get('tanggalMulai')?.toString() ?? ''
    const tanggalSelesai = url.searchParams.get('tanggalSelesai')?.toString() ?? ''


    const { data, error } = await client.armada.tersedia.get({
      query: {
        tglMulai: tanggalMulai, tglSelesai: tanggalSelesai
      }
    })

    if (error) {
      console.error('Gagal Memuat Data: ', error)
    }

    return {
      success: true,
      data: data ?? null,
      date: {
        tanggalMulai, tanggalSelesai
      }
    }
  }
