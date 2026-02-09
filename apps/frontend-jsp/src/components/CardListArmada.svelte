<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { formatPrice } from "$lib/hooks";
  let { armada } = $props();
</script>

<div class="rounded-sm shadow-sm">
  <img
    src={`http://localhost:3000${armada.gambar_armada}`}
    alt={armada.nama_armada}
    class="w-1/2 h-1/2 object-cover"
  />
  <p>{armada.nama_armada}</p>
  <p>{armada.deskripsi}</p>
  <p>Mulai dari</p>
  <p>{formatPrice(armada.harga_sewa)}/hari</p>
  <p>{armada.kapasitas}</p>
  <a href={`/list-armada/${armada.id}`}>
    <Button>Lihat Detail</Button>
  </a>
</div>
