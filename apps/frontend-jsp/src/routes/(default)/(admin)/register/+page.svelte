<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import type { PageProps } from "./$types";

  let { data, form }: PageProps = $props();
</script>

<main>
  <form method="POST" action="?/register">
    <label for="username"> Username </label>
    <input
      type="name"
      name="username"
      value={form?.values.username ?? ""}
      class="border"
    />
    <label for="email"> Email </label>
    <input
      type="email"
      name="email"
      value={form?.values.email ?? ""}
      class="border"
    />
    <label for="password"> Password </label>
    <input
      type="password"
      name="password"
      value={form?.values.password ?? ""}
      class="border"
    />
    <label for="role"> Role </label>
    <Button type="submit">Register</Button>
    <Button formaction="?/login">Login</Button>
  </form>
</main>
