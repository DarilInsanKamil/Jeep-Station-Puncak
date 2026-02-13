<script lang='ts'>
    import Button from "$lib/components/ui/button/button.svelte";
    import CardListArmada from "$lib/molecules/CardListArmada.svelte";
    import type { PageProps } from "./$types";

    let {data}: PageProps = $props()
</script>

<section class="lg:p-10 md:p-5 p-5">
<form action="?search" class="mb-5 flex gap-3">
  <input
    type="text"
    name="search"
    placeholder="Cari nama armada"
    class="border border-green-400 focus:outline-green-600 px-2 py-1 rounded-sm w-full"
  />
  <select id="kapasitas" name="kapasitas" class="bg-white shadow-sm px-2 rounded-sm">
    <option value=undefined>Kapasitas</option>
    <option value="2">2 Orang</option>
    <option value="4">4 Orang</option>
    <option value="8">8 Orang</option>
  </select>
  <Button size="sm" class="bg-green-900 hover:bg-green-800">Cari</Button>
</form>
<div>
    Armada
</div>
    <div class="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
        {#if data.success && data.data.length > 0}
          {#each data.data as armada (armada.id) }
              <CardListArmada {armada} href={`/armada/${armada.id}`}/>
            {/each}
        {/if}
    </div>
</section>
