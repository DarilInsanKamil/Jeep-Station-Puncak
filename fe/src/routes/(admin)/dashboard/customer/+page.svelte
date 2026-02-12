<script lang='ts'>
    import { Eye, EyeOff, Frown, Plus } from "@lucide/svelte";
    import type { PageProps } from "./$types";
    import Button from "$lib/components/ui/button/button.svelte";

    let {data}:PageProps = $props()


    let showSensitive = $state<boolean>(false);

    function censorEmail(email: string) {
      const [name, domain] = email.split("@");
      if (!domain) return email;
      return `${name.slice(0, 2)}***${name.slice(-1)}@${domain}`;
    }

    function censorPhone(phone: string) {
      return `${phone.slice(0, 3)}****${phone.slice(-2)}`;
    }

    function showCensored() {
      showSensitive = !showSensitive;
    }
</script>

<section class="lg:p-10 p-5 w-full">
  <section class="lg:flex inline justify-between items-center">
    <form action="?search" class="lg:mb-0 mb-3">
      <input
        type="text"
        name="search"
        placeholder="Cari nama customer"
        class="border border-green-400 focus:outline-green-600 px-2 py-1 rounded-sm"
      />
      <Button size="sm" class="bg-green-900 hover:bg-green-800">Cari</Button>
    </form>
      <Button size="sm" class="bg-green-900 hover:bg-green-800" onclick={showCensored}>
          {#if showSensitive}
            <EyeOff size={20}/>
            Hide Sensitve Data
          {:else}
            <Eye size={20}/>
            Show Sensitve Data
          {/if}
      </Button>
  </section>

  <div class="w-full overflow-hidden rounded-lg border border-gray-200 lg:mt-5 mt-2">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-gray-500">
        <thead class="bg-green-100 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" class="px-6 py-3 font-medium">No</th>
            <th scope="col" class="px-6 py-3 font-medium">Nama</th>
            <th scope="col" class="px-6 py-3 font-medium">Email</th>
            <th scope="col" class="px-6 py-3 font-medium">Nomor Hp</th>
            <th scope="col" class="px-6 py-3 font-medium">Alamat</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 bg-white">
          {#if data.data && data.data.length > 0}
            {#each data.data as customer, i (customer.id)}
              <tr class="hover:bg-gray-50 transition-colors">
                <td
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {i + 1}
                </td>
                <td
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  {customer.nama_lengkap}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                    {showSensitive ? customer.email : censorEmail(customer.email)}
                </td>
                <td class="whitespace-nowrap px-6 py-4">
                  {showSensitive ? customer.no_hp : censorPhone(customer.no_hp)}
                </td>
                <td class="px-6 py-4">
                  <p
                    class="max-w-xs truncate text-gray-500"
                    title={customer.alamat}
                  >
                    {customer.alamat}
                  </p>
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
                  <p class="text-gray-500">Belum ada data customer tersedia.</p>
                </div>
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</section>
