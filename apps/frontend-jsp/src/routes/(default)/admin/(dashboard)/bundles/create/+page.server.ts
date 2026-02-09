import { fail } from "@sveltejs/kit";
import type { Actions } from "../$types";
import { client } from "$lib/api";
import { withAuth } from "$lib/hooks/index.js";

export const actions = {
  create: async ({ request, cookies }) => {

    const formData = await request.formData()
    const gambarFile = formData.get('gambar_bundle') as File;

    if (!gambarFile || !(gambarFile instanceof File) || gambarFile.size === 0 || gambarFile.name === '') {
      return fail(400, {message: 'Gambar wajib upload'})
    }

    const payload = {
      title: formData.get('title')?.toString() ?? '',
      harga: formData.get('harga')?.toString() ?? '',
      jumlah_unit: Number(formData.get('jumlah_unit') ?? '2'),
      is_active: formData.get('is_active')?.toString() ?? 'true',
      deskripsi: formData.get('deskripsi')?.toString() ?? '',
      addOns: formData.get('addOns')?.toString() ?? '',
      gambar_bundle: gambarFile
    }

    const { data, error } = await withAuth(cookies, async (token) => {
      return await client.bundles.create.post(payload, {
        headers: {
          authorization: `Bearer${token}`
        }
      })
    })

    if (error) {
      const { gambar_bundle, ...restPayload } = payload
      return fail(error.status ?? 400, {
        error: true,
        message: typeof error.value === 'object' ? (error.value as any).message : error.value,
        values: restPayload
      })
    }
    return {
      success: true,
      data: data ?? []
    }

  }
  }satisfies Actions
