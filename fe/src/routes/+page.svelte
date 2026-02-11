<script lang="ts">
    import CardListArmada from "$lib/molecules/CardListArmada.svelte";
    import CardListBundle from "$lib/molecules/CardListBundle.svelte";
    import CardTestimoni from "$lib/molecules/CardTestimoni.svelte";
    import FaqAccordion from "$lib/molecules/FaqAccordion.svelte";
    import Lightbox from "$lib/molecules/Lightbox.svelte";
    import type { PageProps } from "./$types";
    import { PUBLIC_API_URL } from '$env/static/public';
    let{data}: PageProps = $props()

    let selectedImage = $state(null);

    function openImage(url: any) {
       selectedImage = url;
    }

    function closeImage() {
       selectedImage = null;
    }
</script>

<section>
    Hero Section
</section>

<section class="lg:p-10 md:p-5 p-5">
    Armada
    <div class="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
        {#if data.armada && data.armada.length > 0}
            {#each data.armada as armada (armada.id) }
                <CardListArmada {armada}/>
            {/each}
        {/if}
    </div>
</section>

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

<section class="lg:p-10 md:p-5 p-5">
    Testimoni
    {#if data.testimoni && data.testimoni.length > 0}
        {#each data.testimoni as testimoni (testimoni.id) }
            <CardTestimoni {testimoni}/>
        {/each}
    {/if}
</section>

<section class="lg:p-10 md:p-5 p-5">
    Gallery
    <div class="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 mt-5">
        {#if data.gallery && data.gallery.length > 0}
            {#each data.gallery as gallery (gallery.id) }
            <button
              type="button"
              class="rounded overflow-hidden focus:outline-none"
              onclick={() => openImage(`${PUBLIC_API_URL}${gallery.gambar_url}`)}
            >
                <img
                   src={`${PUBLIC_API_URL}${gallery.gambar_url}`}
                   alt={`Image ${gallery.id}`}
                   class="w-full h-auto object-cover cursor-pointer hover:scale-105 transition-all"
                 />
            </button>
            {/each}
        {/if}
    </div>
</section>
<Lightbox image={selectedImage} onClose={closeImage}/>
<section class="lg:p-10 md:p-5 p-5">
    Freaquently Answer Question
    <FaqAccordion/>
</section>
