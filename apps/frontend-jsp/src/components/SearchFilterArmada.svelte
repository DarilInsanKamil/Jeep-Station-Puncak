<script lang="ts">
  let { data } = $props();
</script>

<div class="bg-white rounded-lg shadow-md p-6 mb-8">
  <form action="?search" class="flex flex-col md:flex-row gap-4">
    <div class="flex-1">
      <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
        Cari Armada
      </label>
      <input
        id="search"
        type="text"
        placeholder="Cari berdasarkan nama atau plat nomor..."
        name="search"
        value={data.searchParams.search}
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-950 focus:border-transparent"
      />
    </div>
    <div class="md:w-48">
      <label
        for="kapasitas"
        class="block text-sm font-medium text-gray-700 mb-2"
      >
        Kapasitas
      </label>
      <select
        id="kapasitas"
        name="kapasitas"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-950 focus:border-transparent"
      >
        <option value="">Semua</option>
        <option value="4">4 orang</option>
        <option value="5">5 orang</option>
        <option value="6">6 orang</option>
        <option value="7">7 orang</option>
        <option value="8">8+ orang</option>
      </select>
    </div>
    <div class="flex items-end">
      <button
        type="submit"
        class="w-full md:w-auto px-6 py-2 bg-green-950 text-white rounded-md hover:bg-green-900 transition-colors font-medium"
      >
        Cari
      </button>
    </div>
  </form>
</div>
