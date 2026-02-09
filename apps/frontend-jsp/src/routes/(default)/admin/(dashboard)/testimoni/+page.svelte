<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<ul>
  {#each data?.data as item (item.id)}
    <p>{item.name}</p>
    <p>{item.komentar}</p>
    <form action="?/delete" method="POST" use:enhance>
      <input type="hidden" name="id" value={item.id} />
      <button type="submit" class="btn-danger">Hapus</button>
    </form>
  {/each}
</ul>
