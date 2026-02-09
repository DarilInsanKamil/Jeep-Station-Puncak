<script lang="ts">
  import { Frown } from "@lucide/svelte/icons";
  import CardListArmada from "../../../components/CardListArmada.svelte";
  import SearchFilterArmada from "../../../components/SearchFilterArmada.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>List Armada - Jeep Station Puncak</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-8">
  <div class="container mx-auto px-4 md:px-8 lg:px-20">
    <div class="mb-8">
      <h1 class="text-4xl font-bold font-['phudu'] text-green-950 mb-2">
        Pilih Armada Jeep Anda
      </h1>
      <p class="text-gray-600">
        Temukan jeep yang sempurna untuk petualangan Anda di Puncak
      </p>
    </div>

    <SearchFilterArmada {data} />

    <div class="mb-4">
      <p class="text-gray-600">
        Menampilkan <span class="font-semibold">{data?.data?.length || 0}</span>
        armada
      </p>
    </div>

    {#if data?.data && data.data.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.data as armada (armada.id)}
            <CardListArmada {armada} href={`/list-armada/${armada.id}`}/>
        {/each}
      </div>
    {:else}
      <div class="text-center py-16">
        <Frown class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-700 mb-2">
          Tidak ada armada ditemukan
        </h3>
        <p class="text-gray-500">Coba ubah filter pencarian Anda</p>
      </div>
    {/if}
  </div>
</div>
