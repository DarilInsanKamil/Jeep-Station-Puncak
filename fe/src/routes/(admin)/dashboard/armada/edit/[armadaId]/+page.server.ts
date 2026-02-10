import { withAuth } from "$lib";
import { client } from "$lib/api";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params}) => {
  const armadaId = params.armadaId

  const { data, error } = await client.armada({ armadaId }).get()

  if (error) {
    console.error('Gagal memuat data: ', error)
  }

  return data
}

export const actions: Actions = {
  default: async ({ cookies, request, params }) => {
    const armadaId = params.armadaId

    const formData = await request.formData()
    const gambarFile = formData.get('gambar_armada') as File;


    const payload: any = {
          kapasitas: Number(formData.get('kapasitas')?.toString() ?? 0),
          nama_armada: formData.get('nama_armada')?.toString() ?? '',
          harga_sewa: Number(formData.get('harga_sewa') ?? 0),
          plat_nomor: formData.get('plat_nomor')?.toString() ?? '',
          deskripsi: formData.get('deskripsi')?.toString() ?? '',
        }

    if (gambarFile instanceof File && gambarFile.size > 0) {
      payload.gambar_armada = gambarFile;
    }

    const { data, error } = await withAuth(cookies, async (token) => {
      return await client.armada.edit({ armadaId }).patch(payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    })

    if (error) {
      if (payload.gambar_armada) delete payload.gambar_armada;
      return fail(error.status ?? 400, {
        error: true,
        message: typeof error.value === 'object' ? (error.value as any).message : error.value,
        values: payload
      });
    }
    return {
      success: true
    }
  }
}
