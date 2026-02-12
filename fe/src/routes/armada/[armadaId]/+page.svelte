<script lang='ts'>
    import { PUBLIC_API_URL } from "$env/static/public";
    import { formatRupiah } from "$lib";
    import Button from "$lib/components/ui/button/button.svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import DateRangePick from "$lib/molecules/DateRangePick.svelte";
    import { getLocalTimeZone, parseDate, today, type DateValue, } from "@internationalized/date";

    let {data} = $props()

    let armada = $derived(data.armada)
    let tanggal = $derived(data.date)

    const todayDate = today(getLocalTimeZone());


    let searchFilter = $state({
        start: todayDate,
        end: todayDate.add({ days: 2 })
    });

    $effect(() => {
        // Cek apakah ada data dari server/URL
        if (data.date.tglMulai) {
          searchFilter.start = parseDate(tanggal.tglMulai);
        } else {
          searchFilter.start = todayDate;
        }

        if (data.date.tglSelesai) {
          searchFilter.end = parseDate(tanggal.tglSelesai);
        } else {
          searchFilter.end = todayDate.add({ days: 2 });
        }
      });

    const harga = Number(armada?.harga_sewa)

    let durationInDays = $derived.by(() => {
        const s = searchFilter.start;
        const e = searchFilter.end;

        if (!s || !e) return 0;

        return Math.abs(e.compare(s)) + 1;
      });

</script>
<section class="grid lg:grid-cols-12 md:grid-cols-8 sm:grid-cols-6 grid-cols-6 w-full lg:p-10 p-5">

<div class="col-start-1 lg:col-end-9 md:col-end-8 sm:col-end-6 col-end-7 ">
    <img src={`${PUBLIC_API_URL}${armada?.gambar_armada}`} alt={armada?.nama_armada} width="400" height="400">
    <p>{armada?.nama_armada}</p>
    <p>{armada?.deskripsi}</p>
    <p>{armada?.kapasitas}</p>
    <p>{armada?.plat_nomor}</p>
</div>

<aside class="lg:col-start-9 lg:col-end-13 col-start-1 md:col-end-8 sm:col-end-6 col-end-7">
    <div class="p-2 shadow-md rounded-sm">
    <DateRangePick bind:value={searchFilter}/>
    </div>
    <div class="p-2 shadow-md rounded-sm mt-2">
    <p>Harga per hari: <span class="font-semibold">{formatRupiah(harga)}</span></p>
    <p>Durasi: <span class="font-semibold">{durationInDays} Hari</span></p>
    <Separator class="my-2"/>
    <p class="font-semibold tracking-tight text-2xl">Total: {formatRupiah(harga * durationInDays)}</p>
    </div>
    <Button class="mt-5 w-full bg-green-900 hover:bg-green-800">Lanjut Pembayaran</Button>
</aside>
</section>
