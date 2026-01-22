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

  let value = $state({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ days: 2 }),
  });
</script>

<div class="grid gap-2">
  <Popover.Root>
    <Popover.Trigger>
      {#snippet child({ props })}
        <Button
          variant="outline"
          class={cn(
            "w-['300px'] justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
          {...props}
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          {#if value && value.start}
            {#if value.end}
              {df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
                value.end.toDate(getLocalTimeZone()),
              )}
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
      <RangeCalendar
        bind:value
        numberOfMonths={2}
        placeholder={value?.start}
      />
    </Popover.Content>
  </Popover.Root>
</div>
