<script lang='ts'>
    import Button from "$lib/components/ui/button/button.svelte";

    let {id, nama_armada, harga_sewa, gambar_armada, plat_nomor, kapasitas =1, deskripsi } = $props();
</script>

<div>
    <img src={`http://localhost:3000${gambar_armada}`} alt={nama_armada}>
    <p>{nama_armada}</p>
    <p>{harga_sewa}</p>
    <p>{plat_nomor}</p>
    <p>{kapasitas}</p>
    <p>{deskripsi}</p>
</div>
