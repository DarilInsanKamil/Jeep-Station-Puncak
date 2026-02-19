<script lang="ts">
    import { enhance } from "$app/forms";
    import { generateWhatsAppLink } from "$lib";
    import * as Accordion from "$lib/components/ui/accordion/index.js";
    import Button from "$lib/components/ui/button/button.svelte";
    import { toast } from "svelte-sonner";

    let {
        form,
        armadaId,   // Jadikan opsional
        bundleId,   // Tambahan untuk bundle
        namaItem,   // Tambahan untuk nama mobil / nama paket
        tglMulai,
        tglSelesai,
        totalHarga
    } = $props<{
        form: any;
        armadaId?: string;
        bundleId?: string;
        namaItem: string;
        tglMulai: string;
        tglSelesai: string;
        totalHarga: string;
    }>();

    let isSubmitting = $state(false);
</script>

<Accordion.Root type="single" class="w-full bg-white rounded-sm px-2 shadow-sm" value="item-1">
 <Accordion.Item value="item-1">
  <Accordion.Trigger>Isi Data Reservasi</Accordion.Trigger>
  <Accordion.Content class="flex flex-col gap-4 text-balance">
      <form action="?/reservasi" method="POST" class="flex flex-col gap-3" use:enhance={() => {
          isSubmitting = true;

          return async ({ result, update }) => {
              isSubmitting = false;

              // 1. TAMBAHKAN LOG INI UNTUK DEBUGGING
              console.log("RESPON SERVER:", result);

              // Jika backend sukses mengembalikan data
              if (result.type === 'success' && result.data?.booking) {

                  const bookingResult = result.data.booking as {
                      kode_booking: string;
                      nama_lengkap: string;
                      nama_item: string;
                      total_harga: number;
                  };

                  const waLink = generateWhatsAppLink({
                      kode_booking: bookingResult.kode_booking,
                      nama_lengkap: bookingResult.nama_lengkap,
                      nama_item: bookingResult.nama_item || namaItem,
                      total_harga: bookingResult.total_harga || Number(totalHarga)
                  });

                  window.location.href = waLink;

              } else if (result.type === 'failure') {
                  // 2. TAMPILKAN ERROR KE LAYAR JIKA GAGAL
                  console.error("Gagal Validasi/Server:", result.data);
                  toast.error(result.data?.message || "Gagal membuat reservasi. Periksa kembali data Anda.");
                  await update();

              } else {
                  // Error lainnya (seperti 500 Internal Server Error)
                  toast.error("Terjadi kesalahan pada server.");
                  await update();
              }
          };
      }}>

          {#if armadaId}
             <input type="hidden" name="armada_id" value={armadaId} />
          {/if}
          {#if bundleId}
             <input type="hidden" name="bundle_id" value={bundleId} />
          {/if}

          <input type="hidden" name="nama_item" value={namaItem} />
          <input type="hidden" name="tgl_mulai" value={tglMulai} />
          <input type="hidden" name="tgl_selesai" value={tglSelesai} />
          <input type="hidden" name="total_harga" value={totalHarga} />

          <div>
              <label for="nama_lengkap" class="font-semibold">Nama Lengkap *</label><br>
              <input type="text" name="nama_lengkap" value={form?.values?.nama_lengkap} class="border mt-2 w-full border-green-400 focus:outline-green-600 p-2 rounded-md" required>
          </div>
          <div>
              <label for="email" class="font-semibold">Email *</label><br>
              <input type="email" name="email" value={form?.values?.email} class="border mt-2 w-full border-green-400 focus:outline-green-600 p-2 rounded-md" required>
          </div>
          <div>
              <label for="no_hp" class="font-semibold">Nomor Handphone (whatsapp) *</label><br>
              <input type="text" name="no_hp" value={form?.values?.no_hp} class="border mt-2 w-full border-green-400 focus:outline-green-600 p-2 rounded-md" required>
          </div>
          <div>
              <label for="alamat" class="font-semibold">Alamat *</label><br>
              <input type="text" name="alamat" value={form?.values?.alamat} class="border mt-2 w-full border-green-400 focus:outline-green-600 p-2 rounded-md" required>
          </div>

          <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Memproses...' : 'Lanjut ke Pembayaran (WhatsApp)'}
          </Button>
      </form>
  </Accordion.Content>
 </Accordion.Item>
</Accordion.Root>
