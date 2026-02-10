<script lang="ts">
    import { enhance } from "$app/forms";
    import Button from "$lib/components/ui/button/button.svelte";
    import { toast } from "svelte-sonner";
    import type { PageProps } from "./$types";
    import { ArrowLeft } from "@lucide/svelte";
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

<div class="py-5 px-10">
    <a href="/dashboard/armada" class="flex gap-2">
        <ArrowLeft /> Kembali
    </a>
</div>

<section class="p-10">
    <form action="?create" method="POST" class="grid gap-5 w-1/2" enctype="multipart/form-data" use:enhance={() => {
      return async({result, update}) => {
        if(result.type === 'success') {
          toast.success('Berhasil Menambah data')
        } else if (result.type === 'failure') {
          toast.error((result.data as { message?: string })?.message || "Terjadi kesalahan")
        }
        await update()
      }
    }}>
        <div>
            <label for="gambar_armada" class="font-semibold">
                Gambar Armada *
            </label>
            <br>
            <input
                type="file"
                name="gambar_armada"
                accept="image/*"
                class="border mt-2 w-full border-black p-2 rounded-md"
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
                class="border mt-2 w-full border-black p-2 rounded-md"
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
                class="border mt-2 w-full border-black p-2 rounded-md"
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
                class="border mt-2 w-full border-black p-2 rounded-md"
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
                class="border mt-2 w-full border-black p-2 rounded-md"
                required
            >
        </div>
        <div>
            <label for="deskripsi" class="font-semibold">
                Deskripsi *
            </label>
            <br>
            <textarea name="deskripsi" placeholder="Masuk deskrirpsi armada" class="border mt-2 w-full border-black p-2 rounded-md" required>
                {form?.values?.deskripsi}
            </textarea>
        </div>
        <Button type='submit'>Upload Data Armada</Button>
    </form>
</section>
