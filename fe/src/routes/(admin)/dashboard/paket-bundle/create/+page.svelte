<script lang='ts'>
    import Button from "$lib/components/ui/button/button.svelte";
    import { X } from "@lucide/svelte";
    import type { PageProps } from "./$types";
    import { toast } from "svelte-sonner";
    import { enhance } from "$app/forms";

    let {form}: PageProps = $props()
    let previewUrl = $state<string|null>(null);
    let addOns = $state<string[]>([]);
    let inputAddOn = $state("")

    const handleImageChange = (e: Event) => {
      const input = e.target as HTMLInputElement;
      if(input.files && input.files[0]) {
        const file = input.files[0];
        previewUrl = URL.createObjectURL(file)
      } else {
        previewUrl = null
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

<section class="p-10 w-full">
    <form action="?create" method="POST" class="grid gap-5 w-1/2" enctype="multipart/form-data" use:enhance={()=> {
      return async({result, update}) => {
        if(result.type === 'success') {
          toast.success('Berhasil menambah data bundle')
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
                required
            >
            {#if previewUrl}
                <p class="text-sm text-gray-500 mb-2">Preview:</p>
                <img
                    src={previewUrl}
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
                value={form?.values?.title}
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
                value={form?.values?.harga}
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
                value={form?.values?.jumlah_unit}
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
                    {#each addOns as item, i}
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
                {form?.values?.deskripsi}
            </textarea>
        </div>
        <Button type='submit'>Upload Data Bundle</Button>
    </form>
</section>
