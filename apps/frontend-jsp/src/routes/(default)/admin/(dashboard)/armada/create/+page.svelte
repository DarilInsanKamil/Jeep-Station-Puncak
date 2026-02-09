<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import type { PageProps } from "./$types";
  let { data, form }: PageProps = $props();

  let previewUrl = $state<string | null>(null);
  function handleImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      previewUrl = URL.createObjectURL(file);
    } else {
      previewUrl = null;
    }
  }
</script>

{#if form?.success}
  <div class="alert alert-success">
    <p>Berhasil menambahkan data</p>
  </div>
{/if}
<div>
  <form method="POST" action="?/create" enctype="multipart/form-data">
    <div>
      <label for="gambar_armada"> Gambar Armada </label>
      <input
        type="file"
        name="gambar_armada"
        accept="image/*"
        class="border"
        onchange={handleImageChange}
        required
      />
      {#if previewUrl}
        <div class="mt-4">
          <p class="text-sm text-gray-500 mb-2">Preview:</p>
          <img
            src={previewUrl}
            alt="Preview Armada"
            class="w-full max-w-xs h-48 object-cover rounded-md border border-gray-300"
          />
        </div>
      {/if}
    </div>
    <label for="nama_armada"> Nama Armada </label>

    <input
      type="name"
      name="nama_armada"
      value={form?.values?.nama_armada ?? ""}
      class="border"
    />

    <label for="plat_nomor"> Plat Nomor </label>

    <input
      type="text"
      name="plat_nomor"
      value={form?.values?.plat_nomor ?? ""}
      class="border"
    />
    <label for="harga_sewa"> Harga Sewa </label>
    <input
      type="text"
      name="harga_sewa"
      value={form?.values?.harga_sewa ?? ""}
      class="border"
    />
    <label for="kapasitas"> Kapasitas </label>
    <input
      type="number"
      name="kapasitas"
      value={form?.values?.kapasitas ?? ""}
      class="border"
    />
    <label for="deskripsi"> Deskripsi </label>
    <input
      type="text"
      name="deskripsi"
      value={form?.values?.deskripsi ?? ""}
      class="border"
    />
    <Button type="submit">Upload Armada</Button>
  </form>
</div>
