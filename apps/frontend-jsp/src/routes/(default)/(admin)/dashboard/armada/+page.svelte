<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageProps } from "./$types";
  import CardListArmada from "../../../../../components/CardListArmada.svelte";

  let { data, form }: PageProps = $props();
</script>

<h1>Daftar Armada</h1>

<div>
  <form action="?search">
    <input
      type="text"
      placeholder="search"
      name="search"
      value={data.searchParams.search}
    />
    <button>Search</button>
  </form>
</div>

<ul>
  {#if data?.data && data.data.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each data.data as armada (armada.id)}
        <CardListArmada {armada} />
      {/each}
    </div>
  {:else}
    <div class="text-center py-16">
      <!-- <Frown class="w-16 h-16 text-gray-400 mx-auto mb-4" /> -->
      <h3 class="text-xl font-semibold text-gray-700 mb-2">
        Tidak ada armada ditemukan
      </h3>
      <p class="text-gray-500">Coba ubah filter pencarian Anda</p>
    </div>
  {/if}
</ul>
