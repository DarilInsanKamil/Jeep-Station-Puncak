import { withAuth } from "$lib";
import { client } from "$lib/api";
import { fail, type Actions } from "@sveltejs/kit"

export const actions: Actions = {
  default: async ({ request, cookies }) => {

    const formData = await request.formData()
    const gambarFile = formData.get('gambar_bundle') as File

    if (!gambarFile || !(gambarFile instanceof File) || gambarFile.size === 0 || gambarFile.name === '') {
      return fail(400, { message: "Gambar wajib diupload" });
    }

    const payload = {
      title: formData.get('title')?.toString() ?? '',
      deskripsi: formData.get('deskripsi')?.toString() ?? '',
      harga: formData.get('harga')?.toString() ?? '',
      jumlah_unit: Number(formData.get('jumlah_unit')?.toString() ?? '0'),
      is_active: formData.get('isActive')?.toString() ?? 'true',
      addOns: formData.get('addOns')?.toString() ?? '',
      gambar_bundle: gambarFile
    }

    const { error } = await withAuth(cookies, async (token) => {
      return await client.bundles.create.post(payload, {
        headers: {
          authorization: `Bearer${token}`
        }
      })
    })

    if (error) {
      const {gambar_bundle, ...restPayload} = payload
      return fail(error.status ?? 400, {
        error: true,
        message: typeof error.value === 'object' ? (error.value as any).message : error.value,
        values: restPayload
      })
    }
    return {
      succes: true,
    }
  }
}
