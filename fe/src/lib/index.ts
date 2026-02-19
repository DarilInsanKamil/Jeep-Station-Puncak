// place files you want to import through the `$lib` alias in this folder.
import { type Cookies, redirect } from '@sveltejs/kit';
import { client } from './api';
import { NO_WA } from "$env/static/public";

export async function withAuth<T>(
    cookies: Cookies,
    apiCall: (token: string) => Promise<{ data: T | null; error: any }>
) {
    let accessToken = cookies.get('accessToken');
    const refreshToken = cookies.get('refreshToken');

    // 1. Coba request pertama
    if (accessToken) {
        const response = await apiCall(accessToken);

        // Jika sukses atau error bukan 401, return langsung
        if (!response.error || response.error.status !== 401) {
            return response;
        }
    }

    // 2. Jika Token Kosong atau 401, Lakukan Refresh Logic
    if (!refreshToken) {
        // Tidak ada harapan, lempar ke login
        throw redirect(303, '/login');
    }

    console.log('[Auth] Access Token expired/missing, refreshing...');

    // Panggil endpoint refresh backend
    // PENTING: Kita harus manual pass header Cookie karena ini server-to-server call
    const { data: refreshData, error: refreshError } = await client.auth.refresh.post(
        {},
        {
            headers: {
                cookie: `refreshToken=${refreshToken}`
            }
        }
    );

    if (refreshError || !refreshData) {
        console.error('[Auth] Refresh failed:', refreshError);
        // Hapus cookie yang basi agar bersih
        cookies.delete('accessToken', { path: '/' });
        cookies.delete('refreshToken', { path: '/' });
        throw redirect(303, '/login');
    }

    // 3. Update Cookie SvelteKit (Agar Browser User juga terupdate)
    // Kita gunakan data yang dikirim dari body JSON (Langkah 1)
    let newAccessToken = '';
    let newRefreshToken = ''
    if ('accessToken' in refreshData) {
        newAccessToken = refreshData.accessToken;
        newRefreshToken = refreshData.refreshToken;
    }


    // Set Access Token Baru
    cookies.set('accessToken', newAccessToken, {
        path: '/',
        httpOnly: true,
        maxAge: 900, // 15 menit (Samakan dengan backend)
        secure: process.env.NODE_ENV === 'production'
    });

    // Set Refresh Token Baru (Penting karena backend merotasi refresh token!)
    if (newRefreshToken) {
        cookies.set('refreshToken', newRefreshToken, {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 7 hari
            secure: process.env.NODE_ENV === 'production'
        });
    }

    // 4. Retry Request (Coba lagi dengan token baru)
    console.log('[Auth] Refresh success, retrying request...');
    return await apiCall(newAccessToken);
}


export const formatRupiah = (value: number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(value);
	};


export function generateWhatsAppLink(bookingData: {
    kode_booking: string;
    nama_lengkap: string;
    nama_item: string;
    total_harga: number;
}) {
    // Ganti dengan nomor WhatsApp Admin Jeep Station Puncak (pastikan mulai dari 62, tanpa angka 0 di depan)

    // Format Rupiah
    const formatRp = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(bookingData.total_harga);

    // Template Pesan
    const text = `Halo Admin Jeep Station Puncak, saya ingin konfirmasi pembayaran reservasi.\n\n`
        + `*Kode Booking:* ${bookingData.kode_booking}\n`
        + `*Nama:* ${bookingData.nama_lengkap}\n`
        + `*Pesanan:* ${bookingData.nama_item}\n`
        + `*Total Tagihan:* ${formatRp}\n\n`
        + `Mohon informasikan nomor rekening untuk pembayarannya. Terima kasih.`;

    // Encode URL agar karakter spesial seperti spasi dan enter terbaca di WA
    return `https://wa.me/${NO_WA}?text=${encodeURIComponent(text)}`;
}
