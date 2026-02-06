<script lang='ts'>
    import { enhance } from "$app/forms";
    import type { PageProps } from "./$types";

    let {data}: PageProps = $props()
</script>

<div>
    {#each data?.bundles as bundle (bundle.id)}
        <a href={`/dashboard/bundles/edit/${bundle.id}`}>

        <p>{bundle.title}</p>
        <p>{bundle.harga}</p>
        <p>{bundle.jumlah_unit}</p>
        </a>
        <div>
            <form action="?/delete" method="POST" use:enhance>
                   <input type="hidden" name="id" value={bundle.id} />
                   <button type="submit" class="btn-danger">Hapus</button>
            </form>
        </div>
    {/each}
</div>
