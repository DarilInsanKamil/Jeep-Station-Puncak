<script lang='ts'>
    import { PUBLIC_API_URL } from "$env/static/public";
    import { formatRupiah } from "$lib";
    import Button from "$lib/components/ui/button/button.svelte";
    import RangeCalendar from "$lib/components/ui/range-calendar/range-calendar.svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import BlockedRangeCalendar from "$lib/molecules/BlockedRangeCalendar.svelte";
    import DateRangePick from "$lib/molecules/DateRangePick.svelte";
    import { getLocalTimeZone, parseDate, today, type DateValue, } from "@internationalized/date";

    let {data} = $props()
    let armada = $derived(data.armada)

    const todayDate = today(getLocalTimeZone());

    let searchFilter = $derived({
        start: data.date.tglMulai ? parseDate(data.date.tglMulai) : todayDate,
        end: data.date.tglSelesai ? parseDate(data.date.tglSelesai) : todayDate.add({ days: 2 })
    });


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
    <div class="flex gap-2 items-center mb-5">
    <div class="w-5 h-5 bg-red-300 rounded-sm">
    </div>
    <p class="text-sm font-semibold">Sudah di reservasi</p>
    </div>
    <div class="p-2 shadow-md rounded-sm">
    <DateRangePick
        bind:value={searchFilter}
        unavailableDates={data.unvail}
        />
    </div>
    <div class="p-2 shadow-md rounded-sm mt-2">
    <p>Harga per hari: <span class="font-semibold">{formatRupiah(Number(armada?.harga_sewa))}</span></p>
    <p>Durasi: <span class="font-semibold">{durationInDays} Hari</span></p>
    <Separator class="my-2"/>
    <p class="font-semibold tracking-tight text-2xl">Total: {formatRupiah(Number(armada?.harga_sewa) * durationInDays)}</p>
    </div>
    <Button class="mt-5 w-full bg-green-900 hover:bg-green-800">Lanjut Pembayaran</Button>
</aside>
</section>
