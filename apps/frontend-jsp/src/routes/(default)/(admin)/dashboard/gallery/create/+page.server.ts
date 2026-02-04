import { client } from '$lib/api.js';
import { withAuth } from '$lib/hooks/index.js';
import { fail } from '@sveltejs/kit';

export const actions = {
  create: async ({cookies, request}) => {
    const formData = await request.formData()
    const gambarFile = formData.get('gambar_url') as File
    const deskripsi = formData.get('deskripsi')?.toString() ?? '';

    if (!gambarFile || !(gambarFile instanceof File) || gambarFile.size === 0 || gambarFile.name === '') {
      return fail(400, { message: "Gambar wajib diupload" });
    }

    const payload = {
      gambar_url: gambarFile,
      deskripsi
    }


    const { error } = await withAuth(cookies, async (token) => {
      return await client.gallery.upload.post(payload, {
        headers: {
          Authorization: `Bearer${token}`
        }
      })
    })

    if (error) {
      const { gambar_url, ...restPayload } = payload;
      console.log(error)
      return fail(error.status ?? 400, {
        error: true,
        message: typeof error.value === 'object' ? (error.value as any).message : error.value,
        values: restPayload
      });
    }

    return {
      success: true
    }
  }
}
