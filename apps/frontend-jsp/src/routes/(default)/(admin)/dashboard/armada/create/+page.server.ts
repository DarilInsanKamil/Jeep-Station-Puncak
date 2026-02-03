import { client } from '$lib/api'
import { fail, type Actions } from '@sveltejs/kit';

export const actions = {
  create: async ({ cookies, request }) => {
    const token = cookies.get('accessToken') ?? '';
    const formData = await request.formData()
    const payload = {
      gambar_armada: formData.get('gambar_armada') as File,
      kapasitas: Number(formData.get('kapasitas')?.toString() ?? 0),
      nama_armada: formData.get('nama_armada')?.toString() ?? '',
      harga_sewa: Number(formData.get('harga_sewa') ?? 0),
      plat_nomor: formData.get('plat_nomor')?.toString() ?? '',
      deskripsi: formData.get('deskripsi')?.toString() ?? '',
    }

    console.log('payload', payload)
    console.log('accessToken', token)

    if (payload.gambar_armada.size === 0 || payload.gambar_armada.name === '') {
      return fail(400, { message: "Gambar wajib diupload" });
    }

    const { data, error } = await client.armada.create.post(payload, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })

    if (error) {
          const { gambar_armada, ...restPayload } = payload;

          return fail(error.status ?? 400, {
            error: true,
            message: typeof error.value === 'object' ? (error.value as any).message : error.value,
            values: restPayload // Kirim data teks saja, jangan kirim objek File
          });
        }
    return {
      success: true,
    }
  }
} satisfies Actions
