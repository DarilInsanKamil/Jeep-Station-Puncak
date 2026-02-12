import { client } from "$lib/api";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params, url}) => {
  const armadaId = params.armadaId

  const tglMulai = url.searchParams.get('tanggalMulai')?.toString() ?? '';
  const tglSelesai = url.searchParams.get('tanggalSelesai')?.toString() ?? '';

  const [armadaRes, unvailRes] = await Promise.all([
       client.armada({ armadaId }).get(),
       client.reservasi.unvail({ armadaId }).get()
    ]);

  const safeUnvail = Array.isArray(unvailRes.data) ? unvailRes.data : [];
  if (armadaRes.error || !armadaRes.data) {
       throw error(404, 'Armada tidak ditemukan');
    }

    return {
      armada: armadaRes.data,
      // PENTING: Default ke array kosong [] jika null/error
      unvail: safeUnvail,
      date: {
        tglMulai,
        tglSelesai
      }
    }

}
