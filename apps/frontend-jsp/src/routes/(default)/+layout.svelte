<script>
  const { children } = $props();
  import "../../app.css";
  import Navigation from "../../components/Navigation.svelte";
</script>

<nav class="relative w-full">
  <Navigation />
</nav>
<main>
  {@render children()}
</main>
<footer>ini footer</footer>
