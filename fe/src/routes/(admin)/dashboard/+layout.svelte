
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/molecules/AppSidebar.svelte";

  let { children } = $props();
</script>

<Sidebar.Provider>
  <AppSidebar />
  <main class="overflow-hidden w-full">
    <Sidebar.Trigger />
    {@render children?.()}
  </main>
</Sidebar.Provider>
