<script lang="ts">
    let {form} = $props();

    let previewUrl = $state<string | null>(null);
    function handleImageChange (event: Event) {
      const input = event.target as HTMLInputElement
      if(input.files && input.files[0]) {
        const file = input.files[0]
        previewUrl = URL.createObjectURL(file)
      } else {
        previewUrl = null
      }
    }
</script>

<div>
    <form method="POST" action="?/create" enctype="multipart/form-data">
        <div>
            <label for="gambar_url">Input Gambar</label>
            <input
            type="file"
            name="gambar_url"
            accept="image/*"
            class="border"
            onchange={handleImageChange}
            required
            >
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
        <label for="deskripsi">Deskripsi</label>
        <input
            type="text"
            name="deskripsi"
            value={form?.values?.deskripsi ?? ""}
            placeholder="Tuliskan deskripsi gambar"
        >
        <button type="submit">Upload Image</button>
    </form>
</div>
