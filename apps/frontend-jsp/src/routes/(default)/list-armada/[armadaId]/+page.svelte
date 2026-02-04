<script lang="ts">
    import type { PageProps } from "./$types";

    let {data}: PageProps = $props();
</script>


<div>
    <img
        src={`http://localhost:3000${data.gambar_armada}`}
        alt={data.nama_armada}
    >
    <p>{data.nama_armada}</p>
    <p>{data.harga_sewa}</p>
</div>
