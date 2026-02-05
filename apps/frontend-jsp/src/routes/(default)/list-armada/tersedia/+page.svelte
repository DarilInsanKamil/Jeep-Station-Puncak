<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import type { PageProps } from "./$types";

    let {data}: PageProps = $props()
</script>


{#each data?.data as item (item.id)}
    <img
        src={`http://localhost:3000${item.gambar_armada}`}
        alt={item.nama_armada}
    >
    <p>{item.nama_armada}</p>
    <p>{item.harga_sewa}</p>
    <p>{item.kapasitas}</p>
    <a href={`/list-armada/${item.id}?tglMulai=${data.tanggal.tglMulai}&tglSelesai=${data.tanggal.tglSelesai}`}>Reservasi</a>
{/each}
