<script lang="ts">
    import CardListArmada from '../../../../../../components/CardListArmada.svelte';

  let { data } = $props();
</script>

<CardListArmada id={data.id}
    nama_armada={data.nama_armada}
    kapasitas={data.kapasitas}
    plat_nomor={data.plat_nomor}
    harga_sewa={data.harga_sewa}
    gambar_armada={data.gambar_armada}
    deskripsi={data.deskripsi}
    />
