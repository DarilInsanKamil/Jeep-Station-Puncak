<script>
    import { page } from "$app/state";
  import favicon from "$lib/assets/favicon.svg";
  const { children } = $props();
  import "../app.css";
  import Navigation from "../components/Navigation.svelte";

</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<nav class="relative w-full">
    <Navigation />
</nav>
<main>
  {@render children()}
</main>
<footer>ini footer</footer>
