<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import { DateFormatter, getLocalTimeZone, parseDate, today } from "@internationalized/date";
    import DatePicker from "../../../../components/DatePicker.svelte";
    import type { PageProps } from "./$types";

    let {data, params}: PageProps = $props();

    let bookingDate = $derived({
      start: data.tanggal.start ? parseDate(data?.tanggal.start) : today(getLocalTimeZone()),
      end: data.tanggal.end ? parseDate(data?.tanggal.end) : undefined
    })

</script>


<div>
    <img
        src={`http://localhost:3000${data.armada.gambar_armada}`}
        alt={data.armada.nama_armada}
    >
    <p>{data.armada.nama_armada}</p>
    <p>{data.armada.harga_sewa}</p>
    <DatePicker bind:value={bookingDate}/>
    <Button>
        Reservasi Sekarang
    </Button>
</div>
