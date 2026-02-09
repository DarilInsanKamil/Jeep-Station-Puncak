<script lang='ts'>
    import type { PageProps } from "./$types";
    let {data ,params}: PageProps = $props();
</script>


{#if data.success}
<div>
     <img src={`http://localhost:3000${data.bundle?.gambar_bundles}`} alt={data.bundle?.title}>
     <div>
     <p>{data.bundle?.title}</p>
     <p>{data.bundle?.harga}</p>
     </div>
</div>
{/if}
