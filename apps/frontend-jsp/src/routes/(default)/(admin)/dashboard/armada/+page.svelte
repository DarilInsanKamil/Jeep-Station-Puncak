<script lang="ts">
  let { data } = $props();
</script>

<h1>Daftar Armada</h1>

<!-- Contoh menampilkan data -->
<ul>
  {#each data?.data as item}
    <li>{item?.id}</li>
    <li>{item?.nama_armada}</li>
  {/each}
</ul>
