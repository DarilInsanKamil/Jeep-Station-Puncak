import { client } from '$lib/api'
import { withAuth } from '$lib/hooks';
import { fail, type Actions } from '@sveltejs/kit';

export const actions = {
  create: async ({ cookies, request }) => {
    const token = cookies.get('accessToken') ?? '';
    const formData = await request.formData()

    const gambarFile = formData.get('gambar_armada') as File;


    if (!gambarFile || !(gambarFile instanceof File) || gambarFile.size === 0 || gambarFile.name === '') {
      return fail(400, { message: "Gambar wajib diupload" });
    }

    const payload = {
      gambar_armada: gambarFile,
      kapasitas: Number(formData.get('kapasitas')?.toString() ?? 0),
      nama_armada: formData.get('nama_armada')?.toString() ?? '',
      harga_sewa: Number(formData.get('harga_sewa') ?? 0),
      plat_nomor: formData.get('plat_nomor')?.toString() ?? '',
      deskripsi: formData.get('deskripsi')?.toString() ?? '',
    }
    const { data, error } = await withAuth(cookies, async (token) => {
      return await client.armada.create.post(payload, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
    })

    if (error) {
      const { gambar_armada, ...restPayload } = payload;
      return fail(error.status ?? 400, {
        error: true,
        message: typeof error.value === 'object' ? (error.value as any).message : error.value,
        values: restPayload
      });
    }

    return {
      success: true,
      data
    }
  }
} satisfies Actions
