<script lang='ts'>
    import { derived } from "svelte/store";
    import { page } from "$app/stores";

    const segments = derived(page, ($page) => {
      return $page.url.pathname
        .split('/')
        .filter(Boolean);
    });
</script>

<div>
    {#each $segments as segment, i}
          <span>/</span>
          <a
            href={"/" + $segments.slice(0, i + 1).join("/")}
            class="text-blue-600 hover:underline capitalize"
          >
            {segment}
          </a>
    {/each}
</div>
