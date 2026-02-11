<script lang="ts">
    import CardListArmada from "$lib/molecules/CardListArmada.svelte";
    import CardListBundle from "$lib/molecules/CardListBundle.svelte";
    import type { PageProps } from "./$types";

    let{data}: PageProps = $props()
</script>

<section>
    Hero Section
</section>

<section class="p-10">
    Armada
    <div class="grid grid-cols-4 gap-5 mt-5">
{#if data.armada && data.armada.length > 0}
    {#each data.armada as armada (armada.id) }
        <CardListArmada {armada}/>
    {/each}
{/if}
    </div>
</section>

<section class="p-10">
    Paket Bundle
    <div class="grid grid-cols-4 gap-5 mt-5">
{#if data.bundle && data.bundle.length > 0}
    {#each data.bundle as bundle (bundle.id) }
        <CardListBundle {bundle}/>
    {/each}
{/if}
    </div>
</section>

<section>
    Testimoni
    {#if data.testimoni && data.testimoni.length > 0}
        {#each data.testimoni as testimoni (testimoni.id) }
            <p>{testimoni.name}</p>
        {/each}
    {/if}
</section>

<section>
    Gallery
    {#if data.gallery && data.gallery.length > 0}
        {#each data.gallery as gallery (gallery.id) }
            <p>{gallery.deskripsi}</p>
        {/each}
    {/if}
</section>

<section>
    FAQ
</section>
