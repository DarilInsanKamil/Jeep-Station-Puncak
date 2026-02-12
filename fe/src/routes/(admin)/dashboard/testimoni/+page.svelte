<script lang="ts">
  import { Frown, PencilLine, Plus, Star, Trash } from "@lucide/svelte";
  import type { PageProps } from "./$types";
  import Button from "$lib/components/ui/button/button.svelte";
  import { enhance } from "$app/forms";
  import { toast } from "svelte-sonner";

  let { data, form }: PageProps = $props();
</script>

<section class="lg:p-10 p-5 w-full">
  <section class="flex justify-between">
    <a href="/dashboard/testimoni/create">
    <Button class="bg-green-900 hover:bg-green-800"><Plus size={20} />Tambah Testimoni</Button>
    </a>
  </section>

  <div class="w-full overflow-hidden rounded-lg border border-gray-200 mt-5">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-500">
        <thead class="bg-green-100 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" class="px-6 py-3 font-medium">No</th>
            <th scope="col" class="px-6 py-3 font-medium">Username</th>
            <th scope="col" class="px-6 py-3 font-medium">Rating</th>
            <th scope="col" class="px-6 py-3 font-medium">Komentar</th>
            <th scope="col" class="px-6 py-3 font-medium">Action</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 bg-white">
          {#if data.data && data.data.length > 0}
            {#each data.data as testimoni, i (testimoni.id)}
              <tr class="hover:bg-gray-50 transition-colors">
                <td
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {i + 1}
                </td>
                <td
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {testimoni.name}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  {testimoni.rating} Bintang
                </td>
                <td class="px-6 py-4">
                  <p
                    class="max-w-xs truncate text-gray-500"
                    title={testimoni.komentar}
                  >
                    {testimoni.komentar}
                  </p>
                </td>
                <td class="flex gap-2 px-6 py-4">
                  <a href={`/dashboard/testimoni/edit/${testimoni.id}`}>
                    <Button size="icon-sm" class="hover:bg-green-50" variant="outline">
                      <PencilLine size={20} color="#5b9810" />
                    </Button>
                  </a>
                  <form
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
                    <input type="hidden" name="id" value={testimoni.id} />
                    <Button type="submit" variant="destructive" size="icon-sm">
                      <Trash size={20} />
                    </Button>
                  </form>
                </td>
              </tr>
            {/each}
          {:else}
            <tr>
              <td colspan="5" class="px-6 py-10 text-center">
                <div
                  class="flex flex-col items-center justify-center space-y-2"
                >
                  <Frown size={40} color="#b5b5b5" />
                  <p class="text-gray-500">Belum ada data testimoni.</p>
                </div>
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</section>
