<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Jeep Station Puncak</title>
</svelte:head>

<section>HERO SECTION</section>
<div>
  {data.name}
  {data.email}
</div>
<section>PAKET BUNDLE SECTION</section>
<section>LIST ARMADA SECTION</section>
<section>TESTIMONI</section>
<section>FAQ</section>
