<script>
    import Sidebar from '$lib/molecules/Sidebar.svelte';

  const { children } = $props();
</script>


<main class="grid grid-cols-12 gap-4">
    <div class="col-span-2">
<Sidebar/>
    </div>
<section class=" col-span-9">
  {@render children()}
</section>
</main>
