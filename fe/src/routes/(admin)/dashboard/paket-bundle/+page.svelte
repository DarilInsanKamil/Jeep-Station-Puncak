<script lang="ts">
  import { formatRupiah } from "$lib";
  import { Frown, PencilLine, Plus, Trash } from "@lucide/svelte";
  import type { PageProps } from "./$types";
  import Button from "$lib/components/ui/button/button.svelte";
  import { enhance } from "$app/forms";
  import { toast } from "svelte-sonner";

  let { data, form }: PageProps = $props();
</script>

<section class="p-10 w-full">
  <section class="flex justify-between items-center mb-5">
      <form action="?search">
        <input
          type="text"
          name="search"
          placeholder="Cari nama armada"
          class="border border-gray-200 px-2 py-1 rounded-sm"
        />
        <Button size="sm">Cari</Button>
      </form>
    <a href="/dashboard/paket-bundle/create">
        <Button><Plus size={20} />Tambah Bundle</Button>
    </a>
  </section>

  <div class="w-full overflow-hidden rounded-lg border border-gray-200 ">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-500">
        <thead class="bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" class="px-6 py-3 font-medium">No</th>
            <th scope="col" class="px-6 py-3 font-medium">Nama Bundle</th>
            <th scope="col" class="px-6 py-3 font-medium">Jumlah Unit</th>
            <th scope="col" class="px-6 py-3 font-medium">Harga Sewa</th>
            <th scope="col" class="px-6 py-3 font-medium">Addons</th>
            <th scope="col" class="px-6 py-3 font-medium">Deskripsi</th>
            <th scope="col" class="px-6 py-3 font-medium">Action</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 bg-white">
          {#if data.data && data.data.length > 0}
            {#each data.data as bundle, i (bundle.id)}
              <tr class="hover:bg-gray-50 transition-colors">
                <td
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {i + 1}
                </td>
                <td
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {bundle.title}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                    {bundle.jumlah_unit} Unit
                </td>
                <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                  {formatRupiah(Number(bundle.harga))}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  {#each bundle.addOns as addons }
                      <span
                        class="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600 mr-1"
                      >
                        {addons}
                      </span>
                  {/each}
                </td>
                <td class="px-6 py-4">
                  <p
                    class="max-w-xs truncate text-gray-500"
                    title={bundle.deskripsi}
                  >
                    {bundle.deskripsi}
                  </p>
                </td>
                <td class="flex gap-2 px-6 py-4">
                  <a href={`/dashboard/armada/edit/${bundle.id}`}>
                    <Button size="icon-sm" variant="outline">
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
                    <input type="hidden" name="id" value={bundle.id} />
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
                  <p class="text-gray-500">Belum ada data bundle tersedia.</p>
                </div>
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</section>
