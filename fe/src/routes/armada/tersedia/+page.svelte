<script lang='ts'>
    import CardListArmada from "$lib/molecules/CardListArmada.svelte";
    import type { PageProps } from "./$types";

    let {data}: PageProps = $props()
</script>


<section class="lg:p-10 md:p-5 p-5">
    Armada
    <div class="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
        {#if data.success && data.data.length > 0}
          {#each data.data as armada (armada.id) }
              <CardListArmada {armada} href={`/armada/${armada.id}?tanggalMulai=${data.date.tanggalMulai}&tanggalSelesai=${data.date.tanggalSelesai}`}/>
            {/each}
        {/if}
    </div>
</section>
