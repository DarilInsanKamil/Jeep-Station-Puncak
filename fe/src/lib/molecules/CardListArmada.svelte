<script lang='ts'>
    import { formatRupiah } from "$lib";
    import Button from "$lib/components/ui/button/button.svelte";
    import { UserRound } from "@lucide/svelte";
    import { PUBLIC_API_URL } from '$env/static/public';
    let{armada} = $props()
</script>

<div class="border bg-white shadow-sm rounded-sm">
    <img src={`${PUBLIC_API_URL}${armada.gambar_armada}`} alt={armada.id}  class="object-cover w-full h-64 rounded-t-sm">
    <div class="p-4">
    <div>
        <h4 class="font-semibold tracking-tighter text-xl">{armada.nama_armada}</h4>
        <p class="text-sm text-gray-600">{armada.deskripsi}</p>
    </div>
    <div class="flex gap-2 items-center">
        <div class="mt-3 bg-gray-200 w-fit py-1 px-2 rounded-sm">
            <p class="text-xs font-semibold">{armada.plat_nomor}</p>
        </div>
        <div class="flex gap-1 items-center mt-3 bg-green-300 w-fit py-1 px-2 text-green-900 rounded-sm">
            <UserRound size={16}/>
            <p class="text-xs font-semibold">{armada.kapasitas} Orang</p>
        </div>
    </div>
    <div class="flex justify-between items-center w-full border-t border-green-200 pt-1 mt-2">
        <div>
            <p class="text-sm text-gray-600">Mulai dari</p>
            <p class="font-semibold tracking-tight text-xl">{formatRupiah(armada.harga_sewa)}</p>
        </div>
        <a href={`/armada/${armada.id}`}>
            <Button class="bg-green-900 hover:bg-green-800" size="sm">Lihat Detail</Button>
        </a>
    </div>
    </div>
</div>
