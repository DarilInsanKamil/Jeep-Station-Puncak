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
  import type { DateRange } from "bits-ui";

  const df = new DateFormatter("id-ID", {
    dateStyle: "medium",
  });

  // let value = $state({
  //   start: today(getLocalTimeZone()),
  //   end: today(getLocalTimeZone()).add({ days: 2 }),
  // });

  // let {value = $bindable()} = $props<{value: DateRange | undefined}>()

  // let { value = $bindable({
  //     start: today(getLocalTimeZone()),
  //     end: today(getLocalTimeZone()).add({ days: 2 }),
  //   }) } = $props<{
  //     value?: DateRange
  //   }>();
  //
  let { value = $bindable() } = $props<{
      value?: DateRange
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

<div class="grid gap-2">
  <Popover.Root>
    <Popover.Trigger>
      {#snippet child({ props })}
        <Button
          variant="outline"
          class={cn(
            "w-['300px'] justify-start text-left font-normal ",
            !value && "text-muted-foreground",
          )}
          {...props}
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          {#if value && value.start}
            {#if value.end}
              <p>
                {df.format(value.start.toDate(getLocalTimeZone()))}
              </p>
              <p class="bg-blue-200 p-2 rounded-md">
                {getDaysDuration(value.start, value.end)} Hari
              </p>
              <p>
                {df.format(value.end.toDate(getLocalTimeZone()))}
              </p>
            {:else}
              {df.format(value.start.toDate(getLocalTimeZone()))}
            {/if}
          {:else}
            Pilih Tanggal
          {/if}
        </Button>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-auto p-0" align="start">
      <RangeCalendar bind:value numberOfMonths={2} placeholder={value?.start} />
    </Popover.Content>
  </Popover.Root>
</div>
