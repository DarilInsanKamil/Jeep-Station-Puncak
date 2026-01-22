<script lang="ts">
  import background from "$lib/assets/background.png?enhanced";
  import Button from "$lib/components/ui/button/button.svelte";
  import DateRangePicker from "../DateRangePicker.svelte";
</script>

<section class="relative w-full font-sans">
  <div class="relative w-full overflow-hidden">
    <enhanced:img
      src={background}
      alt="Hero background"
      class="w-full object-cover mask-b-from-80% mask-b-to-90%"
      fetchpriority="high"
      loading="eager"
      height="100px"
    />

    <div class="absolute bottom-22 left-20 right-20">
      <h1
        class="max-w-xl text-5xl font-extrabold leading-11 text-white font-['phudu'] mb-2"
      >
        Sewa dan Reservasi Cepat<br />
        di Jeep Station Puncak
      </h1>
      <div class="rounded-lg bg-white p-6">
        <div class="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="drop-location"
            class="h-4 w-4 rounded border-gray-300"
          />
          <label for="drop-location" class="text-xs text-gray-500"
            >Drop at diffrent location</label
          >
        </div>

        <div>
          <form action="" class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <input type="text" class="rounded-md border px-2"/>
            <DateRangePicker />
            <Button variant="default" size="sm">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* Tambahkan font custom jika diperlukan di sini */
</style>
