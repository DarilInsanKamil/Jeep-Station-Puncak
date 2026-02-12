<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import RangeCalendar from "$lib/components/ui/range-calendar/range-calendar.svelte";
  import { DateFormatter, getLocalTimeZone, today } from "@internationalized/date";
  import { cn } from "$lib/utils";
  import { ArrowRight, CalendarIcon } from "@lucide/svelte";
  import type { DateRange } from "bits-ui";

  let { value = $bindable() } = $props<{
      value: DateRange | undefined;
  }>();
  let innerWidth = $state(0);
  let isDesktop = $derived(innerWidth > 640);
  const df = new DateFormatter("id-ID", { dateStyle: "medium" });
  const minDate = today(getLocalTimeZone());
</script>

<svelte:window bind:innerWidth />

<div class="grid gap-2 w-full"> <Popover.Root>
    <Popover.Trigger class="w-full"> {#snippet child({ props })}
        <div {...props} class="flex items-center gap-2 w-full">

          <div class="grid gap-1.5 text-left flex-1">
            <label for="date_start" class="text-xs font-medium text-muted-foreground ml-1">
              Tanggal Mulai
            </label>
            <Button
              variant="outline"
              id="date_start"
              class={cn(
                "w-full justify-start text-left font-normal", // 4. Ganti w-['200px'] jadi w-full
                !value.start && "text-muted-foreground"
              )}
            >
              <CalendarIcon class="mr-2 h-4 w-4 opacity-50" />
              {#if value.start}
                {df.format(value.start.toDate(getLocalTimeZone()))}
              {:else}
                <span>Pilih tanggal</span>
              {/if}
            </Button>
          </div>

          <div class="pt-6 text-muted-foreground shrink-0">
            <ArrowRight class="h-4 w-4" />
          </div>

          <div class="grid gap-1.5 text-left flex-1">
            <label for="date_end" class="text-xs font-medium text-muted-foreground ml-1">
              Tanggal Selesai
            </label>
            <Button
              variant="outline"
              id="date_end"
              class={cn(
                "w-full justify-start text-left font-normal", // 5. Ganti w-['200px'] jadi w-full
                !value.end && "text-muted-foreground"
              )}
            >
              <CalendarIcon class="mr-2 h-4 w-4 opacity-50" />
              {#if value.end}
                {df.format(value.end.toDate(getLocalTimeZone()))}
              {:else}
                <span>Pilih tanggal</span>
              {/if}
            </Button>
          </div>

        </div>
      {/snippet}
    </Popover.Trigger>

    <Popover.Content class="w-auto p-0" align="start">
      <RangeCalendar
          bind:value minValue={minDate}
          numberOfMonths={isDesktop ? 2 : 1}
          class="p-2"
          />
    </Popover.Content>
  </Popover.Root>
</div>
