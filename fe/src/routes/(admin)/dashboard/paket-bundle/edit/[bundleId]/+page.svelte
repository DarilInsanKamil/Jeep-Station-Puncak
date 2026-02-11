<script lang='ts'>
    import { enhance } from "$app/forms";
    import { toast } from "svelte-sonner";
    import type { PageProps } from "./$types";
    import Button from "$lib/components/ui/button/button.svelte";
    import { X } from "@lucide/svelte";
    import { PUBLIC_API_URL } from "$env/static/public";
    let {data, form}: PageProps = $props()
    let previewUrl = $state<string|null>(data?.gambar_bundles ?? null);
    let addOns = $state<string[]>(data?.addOns ?? []);
    let inputAddOn = $state("")

    function handleImageChange(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        previewUrl = URL.createObjectURL(input.files[0]);
      }
    }

    const handleAddOn = (e: KeyboardEvent | MouseEvent) => {
      if((e instanceof KeyboardEvent && e.key === 'Enter') || e.type === 'click'){
        e.preventDefault()
        const value = inputAddOn.trim()

        if(value && !addOns.includes(value)) {
          addOns = [...addOns, value]
          inputAddOn = ""
        }
    }
    }
    const removeAddOn = (index: number) => {
      addOns = addOns.filter((_,i) => i !== index)
    }
</script>


<section class="lg:p-10 p-5 w-full">
    <form action="?edit" method="POST" class="grid lg:gap-5 gap-3 lg:w-1/2 w-full" enctype="multipart/form-data" use:enhance={()=> {
      return async({result, update}) => {
        if(result.type === 'success') {
          toast.success('Berhasil merubah data bundle')
        } else if (result.type === 'failure') {
          toast.error((result.data as { message?: string })?.message || "Terjadi kesalahan")
        }
        await update()
      }
    }}>
        <div>
            <label for="gambar_bundle" class="font-semibold">
                Gambar Bundle *
            </label>
            <br>
            <input
                type="file"
                name="gambar_bundle"
                accept="image/*"
                class="border mt-2 w-full border-green-200 p-2 rounded-md"
                onchange={handleImageChange}
            >
            {#if previewUrl}
                <p class="text-sm text-gray-500 mb-2">Preview:</p>
                <img
                    src={previewUrl.startsWith('blob:')
                        ? previewUrl
                        : `${PUBLIC_API_URL}${previewUrl}`}
                    alt="Preview bundle"
                    class="w-full max-w-xs h-48 object-cover rounded-md border border-gray-300"
                >
            {/if}
        </div>
        <div>
            <label for="title" class="font-semibold">
                Nama Bundle *
            </label>
            <br>
            <input
                type="text"
                name="title"
                value={form?.values?.title ?? data.title ?? ""}
                placeholder="Masukan nama bundle"
                class="border mt-2 w-full border-green-200 p-2 rounded-md"
                required
            >
        </div>
        <div>
            <label for="harga" class="font-semibold">
                Harga Bundle *
            </label>
            <br>
            <input
                type="text"
                name="harga"
                value={form?.values?.harga ?? data.harga ?? ""}
                placeholder="Masukan harga bundle"
                class="border mt-2 w-full border-green-200 p-2 rounded-md"
                required
            >
        </div>
        <div>
            <label for="jumlah_unit" class="font-semibold">
                Jumlah Unit *
            </label>
            <br>
            <input
                type="number"
                name="jumlah_unit"
                value={form?.values?.jumlah_unit ?? data.jumlah_unit ?? ""}
                placeholder="Masukan jumlah jumlah_unit"
                class="border mt-2 w-full border-green-200 p-2 rounded-md"
                required
            >
        </div>
        <div>
            <label for="plat_nomor" class="font-semibold">
                Fasilitas / AddOns *
            </label>
            <br>
            <input
                type="text"
                placeholder="Contoh: Makan Siang, Tiket Masuk (Tekan Enter)"
                class="border mt-2 w-full border-green-200 p-2 rounded-md"
                bind:value={inputAddOn}
                onkeydown={handleAddOn}
            >
            <Button type="button" variant="outline" onclick={handleAddOn} class='mt-2'>Tambah</Button>
            {#if addOns.length > 0}
                <div class="flex flex-wrap gap-2 mt-2">
                    {#each data.addOns as item, i}
                        <span class="text-gray-800 bg-amber-100 text-sm px-2 py-1 rounded-sm flex items-center gap-1 border font-semibold">
                            {item}
                            <Button
                                size="icon-sm"
                                variant="ghost"
                                type="button"
                                onclick={() => removeAddOn(i)}
                                class="hover:text-red-500"
                            >
                                <X size={16} />
                            </Button>
                        </span>
                    {/each}
                </div>
            {/if}
            <input type="hidden" name="addOns" value={JSON.stringify(addOns)} />
        </div>
        <div>
            <label for="deskripsi" class="font-semibold">
                Deskripsi *
            </label>
            <br>
            <textarea name="deskripsi" placeholder="Masuk deskrirpsi armada" class="border mt-2 w-full border-green-200 p-2 rounded-md" required>
                {form?.values?.deskripsi ?? data.deskripsi ?? ""}
            </textarea>
        </div>
        <Button type='submit'>Upload Data Bundle</Button>
    </form>
</section>
