<script lang="ts">
    import CardPaketBundling from "../../../components/CardPaketBundling.svelte";
    import type { PageProps } from "./$types";

    let {data}: PageProps = $props();
</script>

<div>
    {#if data?.bundles && data.bundles.length > 0}
        {#each data.bundles as bundle (bundle.id)}
            <CardPaketBundling {bundle}/>
        {/each}
        {:else}
            <p>Data tidak ada</p>
    {/if}
</div>
