<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  let { armada, href } = $props();
  import { UsersRound } from "@lucide/svelte/icons";
  import { formatPrice } from "$lib/hooks";
</script>

<div class="">
  <img src={`http://localhost:3000${armada.gambar_armada}`} alt={armada.nama} />
  <h3 class="text-xl font-bold tracking-tight text-gray-800 mb-2">
    {armada.nama_armada}
  </h3>
  <div class="flex gap-2 items-center">
    <UsersRound />
    <p>{armada.kapasitas} orang</p>
  </div>
  <div class="flex justify-between">
    <div>
      <p>Mulai dari</p>
      <p>{formatPrice(armada.harga_sewa)}</p>
    </div>
    <a href={href}>
      <Button>Lihat Detail</Button>
    </a>
  </div>
</div>
