<script>
    import Sidebar from '$lib/molecules/Sidebar.svelte';
    import { ArrowLeft } from '@lucide/svelte';

  const { children } = $props();
</script>


<main class="grid grid-cols-12 min-h-screen">
  <aside class="col-span-2 sticky top-0 h-screen border-r bg-white">
    <Sidebar />
  </aside>
  <section class="col-span-10 p-6">
    {@render children()}
  </section>
</main>
