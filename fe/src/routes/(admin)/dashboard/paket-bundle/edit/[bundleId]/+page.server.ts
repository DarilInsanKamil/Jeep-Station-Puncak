import { client } from "$lib/api";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { withAuth } from "$lib";

export const load: PageServerLoad = async ({ params }) => {
  const bundleId = params.bundleId

  const { data, error } = await client.bundles({ bundleId }).get()

  if (error) {
    console.error('Gagal memuat data: ', error)
  }
  return data
}


export const actions: Actions = {
  default: async ({ params, request, cookies }) => {
    const bundleId = params.bundleId
    const formData = await request.formData()
    const gambarFile = formData.get('gambar_bundle') as File


    const payload:any = {
      title: formData.get('title')?.toString() ?? '',
      harga: formData.get('harga')?.toString() ?? '',
      jumlah_unit: Number(formData.get('jumlah_unit')?.toString() ?? '2'),
      deskripsi: formData.get('deskripsi')?.toString() ?? '',
      addOns: formData.get('addOns')?.toString() ?? '',
      is_active: formData.get('is-active')?.toString() ?? 'true'
    }
    if (gambarFile instanceof File && gambarFile.size > 0) {
      payload.gambar_bundle = gambarFile;
    }

    const { error } = await withAuth(cookies, async (token) => {
      return await client.bundles.edit({ bundleId }).patch(payload, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    })

    if (error) {
      if (payload.gambar_bundle) delete payload.gambar_bundle;
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
