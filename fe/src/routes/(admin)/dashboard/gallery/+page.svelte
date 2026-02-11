<script lang='ts'>
    import { enhance } from "$app/forms";
    import { toast } from "svelte-sonner";
    import type { PageProps } from "./$types";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Plus, Trash } from "@lucide/svelte";
    import { PUBLIC_API_URL } from "$env/static/public";
    let {data}:PageProps = $props();

</script>


<section class="lg:p-10 p-5">
  <a href="/dashboard/gallery/upload">
  <Button><Plus size={20} />Tambah Data Gambar</Button>
  </a>
</section>

<section class="lg:px-10 px-5 grid lg:grid-cols-4 grid-cols-2 gap-4">
    {#if data.data && data.data.length > 0}
        {#each data.data as gallery (gallery.id)}
            <div class="relative border border-green-300 p-3 rounded-md">
                <img src={`${PUBLIC_API_URL}${gallery.gambar_url}`} alt={gallery.id}>
                <p>{gallery.deskripsi}</p>
                <form
                  class="mt-2"
                  action="?delete"
                  method="POST"
                  use:enhance={() => {
                    return async ({ result, update }) => {
                      if (result.type === "success") {
                        toast.success("Berhasil Menghapus data");
                      } else if (result.type === "failure") {
                        toast.error(
                          (result.data as { message?: string })?.message || "Terjadi kesalahan",
                        );
                      }
                      await update();
                    };
                  }}
                >
                  <input type="hidden" name="id" value={gallery.id} />
                  <Button type="submit" variant="destructive" size="sm">
                    <Trash size={20} /> Hapus
                  </Button>
                </form>
            </div>
        {/each}
    {/if}
</section>
