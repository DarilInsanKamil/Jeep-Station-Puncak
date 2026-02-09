<script lang="ts">
  let { form } = $props();
</script>

<div>
  <form action="?/create" method="POST">
    <label for="name">Username</label>
    <input
      type="name"
      name="name"
      value={form?.values?.name ?? ""}
      class="border"
    />
    <label for="komentar">Komentar</label>
    <input
      type="text"
      name="komentar"
      value={form?.values?.komentar ?? ""}
      class="border"
    />
    <label for="rating">Rating</label>
    <input
      type="number"
      name="rating"
      value={form?.values?.rating ?? ""}
      class="border"
    />
    <button type="submit">Create Testimoni</button>
  </form>
</div>
