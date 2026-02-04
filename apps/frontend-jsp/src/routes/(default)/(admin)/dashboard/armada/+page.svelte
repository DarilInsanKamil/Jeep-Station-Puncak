<script lang="ts">
  import { enhance } from '$app/forms';
  import CardListArmada from '../../../../../components/CardListArmada.svelte';

  let { data } = $props();
</script>

<h1>Daftar Armada</h1>

<ul>
   {#each data?.data as item (item.id)}
      <CardListArmada id={item.id}
          nama_armada={item.nama_armada}
          kapasitas={item.kapasitas}
          plat_nomor={item.plat_nomor}
          harga_sewa={item.harga_sewa}
          gambar_armada={item.gambar_armada}
          deskripsi={item.deskripsi}
          />
      <form action="?/delete" method="POST" use:enhance>
             <input type="hidden" name="id" value={item.id} />
             <button type="submit" class="btn-danger">Hapus</button>
      </form>
    {:else}
        <div class="alert alert-info">
            Data armada tidak ditemukan.
        </div>
  {/each}
</ul>
