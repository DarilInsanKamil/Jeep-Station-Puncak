import { withAuth } from "$lib";
import { client } from "$lib/api";
import { fail, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({request, cookies}) => {
    const formData = await request.formData()
    const gambarFile = formData.get('gambar_url') as File

    if (!gambarFile || !(gambarFile instanceof File) || gambarFile.size === 0 || gambarFile.name === '') {
      return fail(400, {message: 'Gambar wajib diupload'})
    }

    const payload = {
      gambar_url: gambarFile,
      deskripsi: formData.get('deskripsi')?.toString() ?? ''
    }
    const { error } = await withAuth(cookies, async (token) => {
      return await client.gallery.upload.post(payload, {
        headers: {
          authorization: `Bearer${token}`
        }
      })
    })
    if (error) {
     const {gambar_url, ...restPayload} = payload
      return fail(error.status ?? 400, {
        error: false,
        message: typeof error.value === 'object' ? (error.value as any).message : error.value,
        values: restPayload
      })
    }
    return {
      success: true
    }
  }
}
