<script lang='ts'>
    import Button from "$lib/components/ui/button/button.svelte";
    import type { PageProps } from "./$types";

    let {data, form}: PageProps = $props();
    let previewUrl = $derived(data?.gambar_bundles)
    let addOns = $derived(data?.addOns);
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

<div>
    <form action="?/edit"  method="POST" enctype="multipart/form-data">
        <div>
            <label for='gambar_bundle'>
                Gambar Bundle
            </label>
            <input type="file" name="gambar_bundle" placeholder="nama paket" onchange={handleImageChange}>
            {#if previewUrl}
                <div class="mt-4">
                  <p class="text-sm text-gray-500 mb-2">Preview:</p>
                  <img
                    src={`http://localhost:3000${previewUrl}`}
                    alt="Preview Armada"
                    class="w-full max-w-xs h-48 object-cover rounded-md border border-gray-300"
                  />
                </div>
            {/if}
        </div>
        <div>
            <label for='title'>
                Nama Paket Bundle
            </label>
            <input type="text" name="title" placeholder="nama paket"
                value={form?.values?.title ?? data?.title ?? ""}
            >
        </div>
        <div>
            <label for='harga'>
                Harga Paket Bundle
            </label>
            <input type="text" name="harga" placeholder="harga paket"
                value={form?.values?.harga ?? data?.harga ?? ""}
            >
        </div>
        <div>
            <label for='jumlah_unit'>
                Jumlah Unit
            </label>
            <input type="text" name="jumlah_unit" placeholder="nama paket" defaultValue="2"
                value={form?.values?.jumlah_unit ?? data?.jumlah_unit ?? ""}
            >
        </div>
        <div>
            <label for='deskripsi'>
                Deskripsi
            </label>
            <input type="text" name="deskripsi" placeholder="deskripsikan paket"
                value={form?.values?.deskripsi ?? data?.deskripsi ?? ""}
            >
        </div>
        <div>
                <label class="block text-sm font-medium mb-1" for="addOns">Fasilitas / Add Ons</label>

                <div class="flex gap-2 mb-2">
                    <input
                        type="text"
                        class="border rounded px-3 py-2 w-full"
                        placeholder="Contoh: Makan Siang, Tiket Masuk (Tekan Enter)"
                        bind:value={inputAddOn}
                        onkeydown={handleAddOn}
                    />
                    <Button type="button" variant="outline" onclick={handleAddOn}>Tambah</Button>
                </div>

                {#if addOns.length > 0}
                    <div class="flex flex-wrap gap-2 mb-2">
                        {#each addOns as item, i}
                            <span class="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center gap-1 border">
                                {item}
                                <button
                                    type="button"
                                    onclick={() => removeAddOn(i)}
                                    class="hover:text-red-500"
                                >
                                    <p>X</p>
                                </button>
                            </span>
                        {/each}
                    </div>
                {/if}
                <input type="hidden" name="addOns" value={JSON.stringify(addOns)} />
            </div>
        <Button type='submit'>Simpan Perubahan</Button>
    </form>
</div>
