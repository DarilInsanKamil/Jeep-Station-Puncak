<script lang="ts">
  import type { PageProps } from "./$types";
  let { data, form }: PageProps = $props();
</script>

<main>
  <form method="POST" action="?/login">
    <label for="email"> Email: </label>
    <input
      type="email"
      name="email"
      value={form?.values.email ?? ""}
      class="border"
    />

    <label for="password"> Password: </label>
    <input
      type="password"
      name="password"
      value={form?.values.password ?? ""}
    />

    <button type="submit">Login</button>
  </form>
</main>
