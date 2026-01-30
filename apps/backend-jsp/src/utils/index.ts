export const hitungDurasi = (tanggal_selesai: string, tanggal_mulai: string) => {
    const durasi = Math.ceil(
        (new Date(tanggal_selesai).getTime() -
            new Date(tanggal_mulai).getTime()) /
        (1000 * 60 * 60 * 24)
    )
    return durasi
}
