<script lang='ts'>
    import { PUBLIC_API_URL } from "$env/static/public";
    import { formatRupiah } from '$lib';
    import AccordionCustomer from "$lib/molecules/AccordionCustomer.svelte";
    import DateRangePick from '$lib/molecules/DateRangePick.svelte';
    import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
    import type { PageProps } from './$types';
    import { Car } from "@lucide/svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";

    let {data, form}: PageProps = $props()
    let bundle = $derived(data.bundle)


    const todayDate = today(getLocalTimeZone());

    let searchFilter = $derived({
        start: todayDate,
        end: todayDate.add({ days: 2 })
    });

    let durationInDays = $derived.by(() => {
        const s = searchFilter.start;
        const e = searchFilter.end;

        if (!s || !e) return 0;

        return Math.abs(e.compare(s)) + 1;
    });
    let totalHarga = $derived(Number(bundle?.harga ?? 0) * durationInDays);
</script>


<section class="grid lg:grid-cols-12 md:grid-cols-8 sm:grid-cols-6 grid-cols-6 lg:p-10 p-5 lg:gap-10 md:gap-5 gap-1 items-start">

    <div class="col-start-1 lg:col-end-9 md:col-end-8 sm:col-end-6 col-end-7 rounded-md p-4"> <img
            src={`${PUBLIC_API_URL}${bundle?.gambar_bundles}`}
            alt={bundle?.title}
            class="object-cover object-center w-full aspect-video rounded-sm mb-4"
        >

        <p class="font-semibold text-2xl tracking-tighter">{bundle?.title}</p>
        <p class="mt-2 text-gray-700">{bundle?.deskripsi}</p> <div class="flex items-center gap-2 mt-4">
            <Car size={32}/>
            <p>{bundle?.jumlah_unit} Unit</p>
        </div>
        <!-- <p class="mt-1 font-mono text-lg">{bundle?.plat_nomor}</p> -->
    </div>

    <aside class="lg:col-start-9 lg:col-end-13 col-start-1 md:col-end-8 sm:col-end-6 col-end-7 h-fit rounded-md p-4"> <div class="flex gap-1 items-center mb-5">
            <div class="w-3 h-3 bg-red-300 rounded-xs"></div>
            <p class="text-sm font-semibold">Sudah di reservasi</p>
        </div>

        <div class="p-2 shadow-md rounded-sm bg-white">
            <DateRangePick
                bind:value={searchFilter}
            />
        </div>

        <div class="p-2 shadow-md rounded-sm my-2 bg-white">
            <p>Harga per hari: <span class="font-semibold">{formatRupiah(Number(bundle?.harga))}</span></p>
            <p>Durasi: <span class="font-semibold">{durationInDays} Hari</span></p>
            <Separator class="my-2"/>
            <p class="font-semibold tracking-tight text-2xl">Total: {formatRupiah(Number(bundle?.harga) * durationInDays)}</p>
        </div>

        <AccordionCustomer
            {form}
            bundleId={bundle?.id}
            namaItem={bundle?.title}
            tglMulai={String(searchFilter.start)}
            tglSelesai={String(searchFilter.end)}
            totalHarga={String(totalHarga)}
        />
    </aside>

</section>
