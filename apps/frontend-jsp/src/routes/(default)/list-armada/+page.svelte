<script lang="ts">
  import CardListArmada from "../../../components/CardListArmada.svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<div>
  <form action="?search">
    <input
      type="text"
      placeholder="search"
      name="search"
      value={data.searchParams.search}
    />
  </form>
</div>
<div>
  <h3>List Armada</h3>
  <section class="grid grid-cols-">
    {#if data?.data && data.data.length > 0}
      {#each data.data as item (item.id)}
        <CardListArmada armada={item} />
      {/each}
    {:else}
      <p>tidak ada data armada</p>
    {/if}
  </section>
</div>
