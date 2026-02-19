import { client } from "$lib/api";
import { error, fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, url }) => {
  const armadaId = params.armadaId;

  const tglMulai = url.searchParams.get('tanggalMulai')?.toString() ?? '';
  const tglSelesai = url.searchParams.get('tanggalSelesai')?.toString() ?? '';

  const [armadaRes, unvailRes] = await Promise.all([
    client.armada({ armadaId }).get(),
    client.reservasi.unvail({ armadaId }).get()
  ]);

  const safeUnvail = Array.isArray(unvailRes.data) ? unvailRes.data : [];

  if (armadaRes.error || !armadaRes.data) {
    throw error(404, 'Armada tidak ditemukan');
  }

  return {
    armada: armadaRes.data,
    unvail: safeUnvail,
    date: {
      tglMulai,
      tglSelesai
    }
  }
}

export const actions: Actions = {
  reservasi: async ({ request }) => {
    const formData = await request.formData();

    const payload = {
      customer: {
        nama_lengkap: formData.get('nama_lengkap')?.toString() ?? '',
        email: formData.get('email')?.toString() ?? '',
        no_hp: formData.get('no_hp')?.toString() ?? '',
        alamat: formData.get('alamat')?.toString() ?? '',
      },
      reservasi: {
        armada_id: formData.get('armada_id')?.toString() ?? '',
        tanggal_mulai: formData.get('tgl_mulai')?.toString() ?? '',
        tanggal_selesai: formData.get('tgl_selesai')?.toString() ?? '',
        metode_pembayaran: 'Transfer',
        total_harga: formData.get('total_harga')?.toString() ?? '',
        jumlah_unit: Number(formData.get('jumlah_unit')?.toString() ?? '1'),
      }
    }

    const { data, error } = await client.reservasi.create.post(payload);

    if (error) {
      return fail(error.status ?? 400, {
        error: true,
        message: typeof error.value === 'object' ? (error.value as any).message : String(error.value),
        values: payload
      });
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
