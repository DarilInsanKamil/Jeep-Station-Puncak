<script lang="ts">
    import { enhance } from '$app/forms';
  import type { PageProps } from './$types';
  let { data }: PageProps = $props();
</script>

<div>
    {#each data?.data as item (item.id)}
        <img
        src={`http://localhost:3000${item.gambar_url}`}
        alt={item.deskripsi}
        />
        <p>{item.deskripsi}</p>
        <form action="?/delete" method="POST" use:enhance>
          <input type="hidden" name="id" value={item.id} />
          <button type="submit" class="btn-danger">Hapus</button>
        </form>
      {/each}
</div>
