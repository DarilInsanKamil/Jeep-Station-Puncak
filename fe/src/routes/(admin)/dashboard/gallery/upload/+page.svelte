<script lang='ts'>
    import { enhance } from "$app/forms";
    import Button from "$lib/components/ui/button/button.svelte";
    import { toast } from "svelte-sonner";
    import type { PageProps } from "./$types";
    let{form}:PageProps = $props();

    let previewUrl = $state<string | null>(null);
    const handleImageChange = (e: Event) => {
      const input = e.target as HTMLInputElement;
      if(input.files && input.files[0]) {
        const file = input.files[0];
        previewUrl = URL.createObjectURL(file)
      } else {
        previewUrl = null
      }
    }
</script>

<section class="p-10  w-full">
<form action="?create" method="POST" class="grid gap-5 w-1/2" enctype="multipart/form-data" use:enhance={() => {
  return async({result, update}) => {
    if(result.type === 'success') {
      toast.success('Berhasil Menambah data')
    } else if (result.type === 'failure') {
      toast.error((result.data as { message?: string })?.message || "Terjadi kesalahan")
    }
    await update({
      reset: true
    })
  }
}}>
    <div>
        <label for="gambar_url" class="font-semibold">
            Upload Gambar *
        </label>
        <br>
        <input
            type="file"
            name="gambar_url"
            accept="image/*"
            class="border mt-2 w-full border-black p-2 rounded-md"
            onchange={handleImageChange}
            required
        >
        {#if previewUrl}
            <p class="text-sm text-gray-500 mb-2">Preview:</p>
            <img
                src={previewUrl}
                alt="Preview armada"
                class="w-full max-w-xs h-48 object-cover rounded-md border border-gray-300"
            >
        {/if}
        <div class="mt-3 mb-5">
            <label for="deskripsi" class="font-semibold">
                Deskripsi *
            </label>
            <br>
            <textarea name="deskripsi" placeholder="Masuk deskrirpsi armada" class="border mt-2 w-full border-black p-2 rounded-md" required>
                {form?.values?.deskripsi}
            </textarea>
        </div>
        <Button type='submit'>Upload Data Gallery</Button>
    </div>
</form>
</section>
