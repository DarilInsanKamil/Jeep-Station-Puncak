<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import { DateFormatter, getLocalTimeZone, parseDate, today } from "@internationalized/date";
    import DatePicker from "../../../../components/DatePicker.svelte";
    import type { PageProps } from "./$types";
    import { formatPrice } from "$lib/hooks";
    import { UserRound } from "@lucide/svelte";
    import FormCustomer from "../../../../components/FormCustomer.svelte";
    import DateRangePicker from "../../../../components/DateRangePicker.svelte";

    let {data, params}: PageProps = $props();

    let bookingDate = $derived({
      start: data.tanggal.start ? parseDate(data?.tanggal.start) : today(getLocalTimeZone()),
      end: data.tanggal.end ? parseDate(data?.tanggal.end) : undefined
    })

    let duration = $derived(() => {
        if (!bookingDate.start || !bookingDate.end) return 1;
        const start = new Date(bookingDate.start.toString());
        const end = new Date(bookingDate.end.toString());
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays || 1;
    });

    let totalPrice = $derived(() => {
        return data.armada.harga_sewa * duration();
    });

</script>


<div class="flex justify-between gap-6 p-10 ">
    <div class="w-full">
    <img
        src={`http://localhost:3000${data.armada.gambar_armada}`}
        alt={data.armada.nama_armada}
        class="w-[80%] object-cover h-[50%]"
    >
    <div>
        <h3>{data.armada.nama_armada}</h3>
        <p>{formatPrice(data.armada.harga_sewa)}</p>
    </div>
        <p>{data.armada.deskripsi}</p>
    <div class="flex">
        <span>
        <p>{data.armada.plat_nomor}</p>
        </span>
        <span>
        <UserRound/>
        <p>{data.armada.kapasitas}</p>
        </span>
    </div>
    </div>
    <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 class="text-2xl font-bold font-['phudu'] text-green-950 mb-6">
                Ringkasan Pemesanan
            </h2>

            <div class="space-y-4">
            <label for='' class="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Sewa
            </label>
            <!-- <DateRangePicker bind:value={bookingDate}/> -->
            <DatePicker bind:value={bookingDate}/>
        </div>

        <div class="border-t border-gray-200 pt-4 space-y-2 mb-5">
            <div class="flex justify-between text-sm">
                <span class="text-gray-600">Harga per hari</span>
                <span class="font-medium">{formatPrice(data.armada.harga_sewa)}</span>
            </div>
            <div class="flex justify-between text-sm">
                <span class="text-gray-600">Durasi</span>
                <span class="font-medium">{duration()} hari</span>
            </div>
            <div class="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span class="text-gray-800">Total</span>
                <span class="text-green-950">{formatPrice(totalPrice())}</span>
            </div>
        </div>
        <!-- <Button class='mt-5'>
            Reservasi Sekarang
        </Button> -->
        <FormCustomer/>
    </div>
    </div>
</div>
