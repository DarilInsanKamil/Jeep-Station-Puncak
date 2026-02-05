<script lang="ts">
    import type { PageProps } from "./$types";

    let {data}: PageProps = $props();
</script>

<div>
    <form action="?search">
<input
    type="text"
    placeholder="search"
    name='search'
    value={data.searchParams.search}
>
<button>Search</button>
    </form>
</div>
<div>
    {#each data?.data as item (item.id)}
        <img
            src={`http://localhost:3000${item.gambar_armada}`}
            alt={item.nama_armada}
        >
        <p>{item.nama_armada}</p>
        <p>{item.harga_sewa}</p>
        <p>{item.kapasitas}</p>
        <a href={`/list-armada/${item.id}`}>Reservasi</a>
    {/each}
</div>
