<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageProps } from "./$types";

    let {data}: PageProps = $props()
</script>

<h1>Customer</h1>

<div>
    <form action="?search" method="GET">
        <input
        type="text"
        placeholder="cari nama customer"
        name="search"
        value={data.searchParams.search}
        >
    </form>
</div>

<div>
    {#each data?.data as item (item.id)}
        <p>{item.nama_lengkap}</p>
        <p>{item.no_hp}</p>
        <p>{item.alamat}</p>
        <p>{item.email}</p>

      {:else}
          <div class="alert alert-info">
              Data customer tidak ditemukan.
          </div>
    {/each}
</div>
