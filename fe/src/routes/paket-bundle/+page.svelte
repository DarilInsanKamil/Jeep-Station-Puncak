<script lang='ts'>
    import CardListBundle from "$lib/molecules/CardListBundle.svelte";
    import type { PageProps } from "./$types";
    let {data}:PageProps = $props();

</script>


<section class="lg:p-10 md:p-5 p-5">
    Paket Bundle
    <div class="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
        {#if data.bundle && data.bundle.length > 0}
            {#each data.bundle as bundle (bundle.id) }
                <CardListBundle {bundle}/>
            {/each}
        {/if}
    </div>
</section>
