<script lang='ts'>
    import Button from "$lib/components/ui/button/button.svelte";

    let {bundle} = $props()
</script>

<div>
    <img src={`http://localhost:3000${bundle.gambar_bundles}`} alt={bundle.title}>
    <div>
        <h3>{bundle.title}</h3>
        <p>{bundle.deskripsi}</p>
    </div>
    <div>
        {#if bundle.addOns && bundle.addOns.length > 0}
            {#each bundle.addOns as addOn }
                <p>{addOn}</p>
            {/each}
        {/if}
    </div>
    <div>
        <p>Mulai dari</p>
        <p>{bundle.harga}</p>
        <a href={`/paket-bundle/${bundle.id}`}>
        <Button>
            Lihat Detail
        </Button>
        </a>
    </div>
</div>
