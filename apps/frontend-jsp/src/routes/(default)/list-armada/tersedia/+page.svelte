<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import type { PageProps } from "./$types";

    let {data}: PageProps = $props()
</script>

<div>

    {#each data?.data as item}

    <p>{item.nama_armada}</p>
    <img src={`http://localhost:3000${item.gambar_armada}`} alt={item.nama_armada}>
    <a href={`/list-armada/${item.id}`}>
    <Button>Reservasi</Button>
    </a>
{/each}
</div>
