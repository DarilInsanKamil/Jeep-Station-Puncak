import { client } from "$lib/api";
import { error, fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { withAuth } from "$lib/hooks";

export const load: PageServerLoad = async ({params}) => {
  const bundleId = params.bundleId
  const { data, error: apiError } = await client.bundles({ bundleId }).get()
  if (apiError || !data) {
    throw error(404, {
    message: "Data tidak ditemukan"
  });
  }
  return data
}

export const actions = {
  edit: async ({request, cookies, params}) => {
    const bundleId = params.bundleId?.toString() ?? '';

    const formData = await request.formData()
    const gambarFile = formData.get('gambar_bundle') as File;

    const payload:any = {
      title: formData.get('title')?.toString() ?? '',
      harga: formData.get('harga')?.toString() ?? '',
      jumlah_unit: Number(formData.get('jumlah_unit') ?? '2'),
      is_active: formData.get('is_active')?.toString() ?? 'true',
      deskripsi: formData.get('deskripsi')?.toString() ?? '',
      addOns: formData.get('addOns')?.toString() ?? '',
    }

    if (gambarFile && gambarFile.size > 0) {
      payload.gambar_bundle = gambarFile;
    }

    if (gambarFile && (gambarFile as File).size > 0) {
      payload.gambar_bundle = gambarFile;
    }

    const { data, error } = await withAuth(cookies, async (token) => {
      return await client.bundles.edit({ bundleId }).patch(payload, {
        headers: {
          Authorization: `Bearer${token}`
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
  } satisfies Actions
