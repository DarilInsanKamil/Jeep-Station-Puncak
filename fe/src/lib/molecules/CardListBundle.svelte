<script lang='ts'>
    import { formatRupiah } from "$lib";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Car } from "@lucide/svelte";

    let{bundle} = $props()
</script>

<div class="border bg-white shadow-sm rounded-sm">
    <img src={`http://localhost:3000${bundle.gambar_bundles}`} alt={bundle.id}  class="object-cover w-full h-64 rounded-t-sm">
    <div class="p-4">
    <div>
        <h4 class="font-semibold tracking-tighter text-xl">{bundle.title}</h4>
        <p class="text-sm text-gray-600">{bundle.deskripsi}</p>
    </div>
    <div class="flex gap-1 items-center">
            {#each bundle.addOns as addons}
                <div class="mt-3 bg-gray-200 w-fit py-1 px-2 rounded-sm">
                    <p class="text-xs font-semibold">{addons}</p>
                </div>
            {/each}
    </div>
        <div class="flex gap-1 items-center mt-2 bg-green-300 w-fit py-1 px-2 text-green-900 rounded-sm">
            <Car size={16}/>
            <p class="text-xs font-semibold">{bundle.jumlah_unit} Unit</p>
        </div>
    <div class="flex justify-between items-center w-full border-t border-green-200 pt-1 mt-2">
        <div>
            <p class="text-sm text-gray-600">Mulai dari</p>
            <p class="font-semibold tracking-tight text-xl">{formatRupiah(bundle.harga)}</p>
        </div>
        <a href={`/paket-bundle/${bundle.id}`}>
            <Button class="bg-green-900 hover:bg-green-800" size="sm">Lihat Detail</Button>
        </a>
    </div>
    </div>
</div>
