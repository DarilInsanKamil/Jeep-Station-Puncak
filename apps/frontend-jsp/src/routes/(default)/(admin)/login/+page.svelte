<script lang="ts">
  import type { PageProps } from "./$types";

  let { data, form }: PageProps = $props();
</script>

<main>
  <!-- {#if form?.error}
    <p style="color: red;">{form.message}</p>
  {/if} -->

  <form method="POST">
    <label>
      Username:
      <input
        type="username"
        name="username"
        value={form?.values.username ?? ""}
      />
    </label>

    <label>
      Email:
      <input type="email" name="email" value={form?.values.email ?? ""} />
    </label>

    <label>
      Password:
      <input
        type="password"
        name="password"
        value={form?.values.password ?? ""}
      />
    </label>

    <button type="submit">Login</button>
  </form>

  <!-- hello -->
</main>
