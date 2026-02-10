<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from "$lib/components/ui/sonner/index.js";
	let { children } = $props();
	import '../app.css'
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster/>
<main>
    {@render children()}
</main>
