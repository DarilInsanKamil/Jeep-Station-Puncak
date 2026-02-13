<script lang="ts">
 import * as Accordion from "$lib/components/ui/accordion/index.js";
    import Button from "$lib/components/ui/button/button.svelte";

 let { form = $bindable()} = $props<{
     form: any;
 }>();
</script>

<Accordion.Root type="single" class="w-full bg-white rounded-sm px-2 shadow-sm" value="item-1">
 <Accordion.Item value="item-1">
  <Accordion.Trigger>Isi Data Reservasi</Accordion.Trigger>
  <Accordion.Content class="flex flex-col gap-4 text-balance">
      <form action="?reservasi" method="POST" class="flex flex-col gap-3">
          <div>
              <label for="nama_lengkap" class="font-semibold">
                  Nama Lengkap *
              </label>
              <br>
              <input
                  type="text"
                  name="nama_lengkap"
                  value={form?.values?.nama_lengkap}
                  placeholder="Masukan nama lengkap anda"
                  class="border mt-2 w-full border-green-400 focus:outline-green-600 p-2 rounded-md"
                  required
              >
          </div>
          <div>
              <label for="email" class="font-semibold">
                  Email *
              </label>
              <br>
              <input
                  type="email"
                  name="email"
                  value={form?.values?.email}
                  placeholder="Masukan email (aktif)"
                  class="border mt-2 w-full border-green-400 focus:outline-green-600 p-2 rounded-md"
                  required
              >
          </div>
          <div>
              <label for="no_hp" class="font-semibold">
                  Nomor Handphone (whatsapp) *
              </label>
              <br>
              <input
                  type="text"
                  name="no_hp"
                  value={form?.values?.no_hp}
                  placeholder="Masukan nomor handphone (aktif)"
                  class="border mt-2 w-full border-green-400 focus:outline-green-600 p-2 rounded-md"
                  required
              >
          </div>
          <div>
              <label for="alamat" class="font-semibold">
                  Alamat *
              </label>
              <br>
              <input
                  type="text"
                  name="alamat"
                  value={form?.values?.alamat}
                  placeholder="Masukan alamat"
                  class="border mt-2 w-full border-green-400 focus:outline-green-600 p-2 rounded-md"
                  required
              >
          </div>
          <Button>Lanjut ke Pembayaran</Button>
      </form>
  </Accordion.Content>
 </Accordion.Item>
</Accordion.Root>
