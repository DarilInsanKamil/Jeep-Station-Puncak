<script lang="ts">
  import CalendarIcon from "lucide-svelte/icons/calendar";
  import {
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
    today,
  } from "@internationalized/date";
  import { cn } from "$lib/utils";
  import { Button } from "$lib/components/ui/button";
  import { RangeCalendar } from "$lib/components/ui/range-calendar";
  import * as Popover from "$lib/components/ui/popover";

  const df = new DateFormatter("id-ID", {
    dateStyle: "medium",
  });

  let { value = $bindable() } = $props<{
      value?: any
    }>();


  // Tambahkan fungsi ini untuk menghitung durasi
  function getDaysDuration(start: DateValue, end: DateValue) {
    const startDate = start.toDate(getLocalTimeZone());
    const endDate = end.toDate(getLocalTimeZone());

    // Hitung selisih waktu dalam milidetik
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());

    // Konversi ke hari (1000ms * 60s * 60m * 24h)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Tambah 1 agar inklusif (hari yang sama = 1 hari)
    return diffDays + 1;
  }
</script>

<div class="grid gap-2 md:hidden sm:hidden lg:block">
    <RangeCalendar bind:value numberOfMonths={2} placeholder={value?.start}/>
</div>
