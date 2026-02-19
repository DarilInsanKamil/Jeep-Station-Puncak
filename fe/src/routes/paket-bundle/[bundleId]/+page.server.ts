import { client } from "$lib/api";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params}) => {
  const bundleId = params.bundleId
  const { data, error } = await client.bundles({ bundleId }).get()

  if (!data) {
       throw Error('Bundle tidak ditemukan');
  }

  return {
    bundle: data ?? null,
  }
}

export const actions: Actions = {
  reservasi: async ({ request, params }) => {
    const bundleId = params.bundleId

    const formData = await request.formData()
      const payload = {
        customer: {
        nama_lengkap: formData.get('nama_lengkap')?.toString() ?? '',
        email: formData.get('email')?.toString() ?? '',
        no_hp: formData.get('no_hp')?.toString() ?? '',
        alamat: formData.get('alamat')?.toString() ?? '',
        },
        reservasi: {
        bundle_id: bundleId,
        tanggal_mulai: formData.get('tgl_mulai')?.toString() ?? '',
        tanggal_selesai: formData.get('tgl_selesai')?.toString() ?? '',
        metode_pembayaran: 'Transfer',
        total_harga: formData.get('total_harga')?.toString() ?? '',
        jumlah_unit: Number(formData.get('jumlah_unit')?.toString() ?? '1'),
        }
      }

      const { data, error } =  await client.reservasi.create.post(payload)

      if (error) {
        return fail(error.status ?? 400, {
          error: true,
          message: typeof error.value === 'object' ? (error.value as any).message : error.value,
          values: payload
        })
      }

      if (data && 'reservasiId' in data) {
          return {
              success: true,
              booking: {
                  kode_booking: data.reservasiId,
                  nama_lengkap: formData.get('nama_lengkap')?.toString(),
                  total_harga: Number(formData.get('total_harga')),
                  nama_item: formData.get('nama_item')?.toString()
              }
          };
      }

      return fail(500, {
          success: false,
          message: 'Gagal mendapatkan data booking dari server.'
      });
  }
}
