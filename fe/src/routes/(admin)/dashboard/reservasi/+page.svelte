<script lang='ts'>
    import { Frown, PencilLine, Trash } from "@lucide/svelte";
    import type { PageProps } from "./$types";
    import Button from "$lib/components/ui/button/button.svelte";
    import { enhance } from "$app/forms";
    import { toast } from "svelte-sonner";
    import { formatRupiah } from "$lib";

    let {data}: PageProps = $props()
</script>


<!-- <p>{JSON.stringify(data)}</p> -->

<section class="lg:p-10 p-5 w-full">

<div class="w-full overflow-hidden rounded-lg border border-gray-200 lg:mt-5 mt-2">
  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm text-gray-500">
      <thead class="bg-green-100 text-xs uppercase text-gray-700">
        <tr>
          <th scope="col" class="px-6 py-3 font-medium">No</th>
          <th scope="col" class="px-6 py-3 font-medium">Kode Booking</th>
          <th scope="col" class="px-6 py-3 font-medium">Tanggal Mulai</th>
          <th scope="col" class="px-6 py-3 font-medium">Tanggal Selesai</th>
          <th scope="col" class="px-6 py-3 font-medium">Jumlah Unit</th>
          <th scope="col" class="px-6 py-3 font-medium">Nama Customer</th>
          <th scope="col" class="px-6 py-3 font-medium">Nama Bundle</th>
          <th scope="col" class="px-6 py-3 font-medium">Nama Armada</th>
          <th scope="col" class="px-6 py-3 font-medium">Action</th>
        </tr>
      </thead>

      <tbody class="divide-y divide-green-200 bg-white">
        {#if data.reservasi && data.reservasi.length > 0}
          {#each data.reservasi as reservasi, i (reservasi.id)}
            <tr class="hover:bg-gray-50 transition-colors">
              <td
                class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
              >
                {i + 1}
              </td>
              <td
                class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
              >
                {reservasi.kode_booking}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                <span
                  class="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600"
                >
                  {reservasi.tanggal_mulai}
                </span>
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                <span
                  class="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600"
                >
                  {reservasi.tanggal_selesai}
                </span>
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-gray-700">
                {reservasi.jumlah_unit} armada
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                {reservasi.nama_customer}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                {reservasi.nama_bundle ?? '-'}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                {reservasi.nama_armada}
              </td>
              <td class="flex gap-2 px-6 py-4">
                <a href={`/dashboard/reservasi/edit/${reservasi.id}`}>
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
                  <input type="hidden" name="id" value={reservasi.id} />
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
                <p class="text-gray-500">Belum ada data reservasi tersedia.</p>
              </div>
            </td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>
</section>
