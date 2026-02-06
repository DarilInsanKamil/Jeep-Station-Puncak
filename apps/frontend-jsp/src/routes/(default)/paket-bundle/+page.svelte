<script lang="ts">
    import type { PageProps } from "./$types";

    let {data}: PageProps = $props();
</script>

<div>
    {#each data.bundles as bundle (bundle.id)}
        <p>{bundle.title}</p>
        <p>{bundle.harga}</p>
    {/each}
</div>
