import { client } from '$lib/api.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({url}) => {
    const kapasitas = Number(url.searchParams.get('kapasitas') ?? '2');
    const tglMulai = url.searchParams.get('tglMulai') ?? '';
    const tglSelesai = url.searchParams.get('tglSelesai') ?? '';


    const { data, error } = await client.armada.tersedia.get({
      query: {
        kapasitas, tglMulai, tglSelesai
      }
    })

    if (error) {
      console.error('Gagal Memuat Data: ', error)
    }
  return {
      success: true,
      data: data ?? []
    }
  }
