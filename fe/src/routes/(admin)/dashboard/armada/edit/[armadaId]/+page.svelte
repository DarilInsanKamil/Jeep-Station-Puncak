<script lang='ts'>
    import { enhance } from "$app/forms";
    import { toast } from "svelte-sonner";
    import type { PageProps } from "./$types";
    import Button from "$lib/components/ui/button/button.svelte";
    import { ArrowLeft } from "@lucide/svelte";

    let {data, form} : PageProps = $props();
    let previewUrl = $derived(data?.gambar_armada ?? null);

    function handleImageChange(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        previewUrl = URL.createObjectURL(input.files[0]);
      }
    }

</script>

<div class="py-5 px-10">
    <a href="/dashboard/armada" class="flex gap-2">
        <ArrowLeft /> Kembali
    </a>
</div>

<section class="p-10">
    <form action="?edit" method="POST" class="grid gap-5 w-1/2" enctype="multipart/form-data" use:enhance={() => {
      return async({result, update}) => {
        if(result.type === 'success') {
          toast.success('Berhasil Merubah data')
        } else if (result.type === 'failure') {
          console.error(result.data as { message?: string })
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
            >
            {#if previewUrl}
                <p class="text-sm text-gray-500 mb-2"> {previewUrl.startsWith('blob:') ? 'Preview Gambar Baru:' : 'Gambar Saat Ini:'}</p>
                <img
                    src={previewUrl.startsWith('blob:')
                        ? previewUrl
                        : `http://localhost:3000${previewUrl}`}
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
                value={form?.values?.nama_armada ?? data.nama_armada ?? ""}
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
                value={form?.values?.harga_sewa ?? data.harga_sewa ?? ""}
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
                value={form?.values?.kapasitas ?? data.kapasitas ?? ""}
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
                value={form?.values?.plat_nomor ?? data.plat_nomor ?? ""}
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
                {form?.values?.deskripsi ?? data.deskripsi ?? ""}
            </textarea>
        </div>
        <Button type='submit'>Upload Data Armada</Button>
    </form>
</section>
