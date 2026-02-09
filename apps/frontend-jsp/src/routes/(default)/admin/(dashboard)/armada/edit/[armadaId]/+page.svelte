<script lang='ts'>
    import Button from "$lib/components/ui/button/button.svelte";
    import type { PageProps } from "./$types";

    let {data, form}: PageProps  = $props();
    let previewUrl = $derived(data?.gambar_armada ?? null);

    function handleImageChange(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        previewUrl = URL.createObjectURL(input.files[0]);
      }
    }
    const API_URL = 'http://localhost:3000';
</script>


<div>
    <form method="POST" action="?/edit" enctype="multipart/form-data">
        <div>
          <label for="gambar_armada"> Gambar Armada </label>
          <input
            type="file"
            name="gambar_armada"
            accept="image/*"
            class="border"
            onchange={handleImageChange}
          />
          {#if previewUrl}
              <div class="mt-4">
                  <p class="text-sm text-gray-500 mb-2">
                      {previewUrl.startsWith('blob:') ? 'Preview Gambar Baru:' : 'Gambar Saat Ini:'}
                  </p>

                  <img
                      src={previewUrl.startsWith('blob:')
                          ? previewUrl
                          : `${API_URL}${previewUrl}`}
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
        value={form?.values?.nama_armada ?? data?.nama_armada ?? ""}
        class="border"
      />

      <label for="plat_nomor"> Plat Nomor </label>

      <input
        type="text"
        name="plat_nomor"
        value={form?.values?.plat_nomor ?? data?.plat_nomor ?? ""}
        class="border"
      />
      <label for="harga_sewa"> Harga Sewa </label>
      <input
        type="text"
        name="harga_sewa"
        value={form?.values?.harga_sewa ?? data?.harga_sewa ?? ""}
        class="border"
      />
      <label for="kapasitas"> Kapasitas </label>
      <input
        type="number"
        name="kapasitas"
        value={form?.values?.kapasitas ?? data?.kapasitas ?? ""}
        class="border"
      />
      <label for="deskripsi"> Deskripsi </label>
      <input
        type="text"
        name="deskripsi"
        value={form?.values?.deskripsi ?? data?.deskripsi ?? ""}
        class="border"
      />
      <Button type="submit">Upload Armada</Button>
    </form>
</div>
