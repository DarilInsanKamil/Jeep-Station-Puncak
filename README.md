# Jeep Station Puncak

Proyek ini adalah aplikasi web *monorepo* yang menggunakan **Bun** sebagai *runtime* dan *package manager*. Aplikasi ini terdiri dari backend berbasis **ElysiaJS** dan frontend menggunakan **SvelteKit**.

## Struktur Proyek

* **apps/backend-jsp**: REST API menggunakan [ElysiaJS](https://elysiajs.com/).
* **apps/frontend-jsp**: Aplikasi web menggunakan [SvelteKit](https://kit.svelte.dev/) dan [Tailwind CSS](https://tailwindcss.com/).

## Prasyarat

Pastikan Anda telah menginstal [Bun](https://bun.sh/) di sistem Anda (versi v1.2.19 atau lebih baru direkomendasikan).

## Instalasi

Instal semua dependensi untuk seluruh *workspace* dari direktori utama:

```bash
bun install

```

## Konfigurasi Environment

Buat file `.env` di dalam folder `apps/backend-jsp/` dengan variabel berikut:

```env
PGHOST=your_postgres_host
PGUSER=your_postgres_user
PGPASSWORD=your_postgres_password
PGDATABASE=your_postgres_db
JWT_SECRET=your_secret_key

```

## Jalankan Aplikasi

### Pengembangan (Development)

Untuk menjalankan kedua aplikasi secara bersamaan dari direktori utama:

```bash
bun run dev

```
atau

```bash
bun run --filter '*' dev   

```

Atau jalankan secara terpisah:

* **Backend**: Masuk ke `apps/backend-jsp` dan jalankan `bun run dev` (berjalan di port 3000).
* **Frontend**: Masuk ke `apps/frontend-jsp` dan jalankan `bun run dev` (berjalan di port 5173).

### Migrasi Database

Gunakan perintah berikut di folder `apps/backend-jsp` untuk menjalankan migrasi database:

```bash
bun run migrate up

```

## Pengujian

Jalankan pengujian unit untuk backend dengan perintah:

```bash
# Di dalam apps/backend-jsp
bun test

```

Pengujian mencakup alur autentikasi dan fungsionalitas endpoint user.
