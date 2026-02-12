<script lang="ts">
    import { enhance } from "$app/forms";
    import Button from "$lib/components/ui/button/button.svelte";
    import { toast } from "svelte-sonner";
    import type { PageProps } from "./$types";
    import { ArrowLeft } from "@lucide/svelte";

    import { page } from '$app/state';
    import BreadCrumb from "$lib/molecules/BreadCrumb.svelte";
     // Reactive access to the full URL object
    let currentUrl = $state (page.url.pathname);
    let{form}:PageProps = $props();

    let previewUrl = $state<string | null>(null);
    const handleImageChange = (e: Event) => {
      const input = e.target as HTMLInputElement;
      if(input.files && input.files[0]) {
        const file = input.files[0];
        previewUrl = URL.createObjectURL(file)
      } else {
        previewUrl = null
      }
    }

</script>

<div class="py-5 lg:px-10 px-5">
    <a href="/dashboard/armada" class="flex gap-2 mb-3">
        <ArrowLeft /> Kembali
    </a>
    <BreadCrumb/>
</div>

<section class="lg:p-10 p-5 ">
    <form action="?create" method="POST" class="grid lg:gap-5 lg:w-1/2 gap-3 w-full" enctype="multipart/form-data" use:enhance={() => {
      return async({result, update}) => {
        if(result.type === 'success') {
          toast.success('Berhasil Menambah data')
        } else if (result.type === 'failure') {
          toast.error((result.data as { message?: string })?.message || "Terjadi kesalahan")
        }
        await update()
      }
    }} >
        <div>
            <label for="gambar_armada" class="font-semibold">
                Gambar Armada *
            </label>
            <br>
            <input
                type="file"
                name="gambar_armada"
                accept="image/*"
                class="border mt-2 w-full border-green-400 focus:outline-green-600 p-2 rounded-md"
                onchange={handleImageChange}
                required
            >
            {#if previewUrl}
                <p class="text-sm text-gray-500 mb-2">Preview:</p>
                <img
                    src={previewUrl}
                    alt="Preview armada"
                    class="w-full max-w-xs h-48 object-cover rounded-md border border-gray-300"
                >
            {/if}
        </div>
        <div>
            <label for="nama_armada" class="font-semibold">
                Nama Armada *
            </label>
            <br>
            <input
                type="text"
                name="nama_armada"
                value={form?.values?.nama_armada}
                placeholder="Masukan nama armada"
                class="border mt-2 w-full border-green-400 focus:outline-green-600 p-2 rounded-md"
                required
            >
        </div>
        <div>
            <label for="harga_sewa" class="font-semibold">
                Harga Sewa *
            </label>
            <br>
            <input
                type="text"
                name="harga_sewa"
                value={form?.values?.harga_sewa}
                placeholder="Masukan harga sewa/hari"
                class="border mt-2 w-full border-green-400 focus:outline-green-600 p-2 rounded-md"
                required
            >
        </div>
        <div>
            <label for="kapasitas" class="font-semibold">
                Kapasitas *
            </label>
            <br>
            <input
                type="number"
                name="kapasitas"
                value={form?.values?.kapasitas}
                placeholder="Masukan jumlah kapasitas"
                class="border mt-2 w-full border-green-400 focus:outline-green-600 p-2 rounded-md"
                required
            >
        </div>
        <div>
            <label for="plat_nomor" class="font-semibold">
                Plat Nomor *
            </label>
            <br>
            <input
                type="text"
                name="plat_nomor"
                value={form?.values?.plat_nomor}
                placeholder="Masukan nopol armada"
                class="border mt-2 w-full border-green-400 focus:outline-green-600 p-2 rounded-md"
                required
            >
        </div>
        <div>
            <label for="deskripsi" class="font-semibold">
                Deskripsi *
            </label>
            <br>
            <textarea name="deskripsi" cols="4" placeholder="Masuk deskrirpsi armada" class="border mt-2 w-full border-green-400 focus:outline-green-600 p-2 rounded-md" required>
            </textarea>
        </div>
        <Button type='submit' class="bg-green-900 hover:bg-green-800">Upload Data Armada</Button>
    </form>
</section>
