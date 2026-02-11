<script lang='ts'>
    import { Car, ClipboardClock, Package2, UsersRound } from "@lucide/svelte";
    import type { PageProps } from "./$types";

    let {data} : PageProps = $props()
</script>

<section class="lg:p-10 p-5">
    <div class="grid lg:grid-cols-4 grid-cols-2 gap-5">
        <a href="/dashboard/armada" class='flex gap-3 flex-col items-center px-5 py-3 hover:bg-green-200 bg-green-100 cursor-pointer rounded-md'>
            <Car size={28} />
            <h3 class='text-gray-500 text-xl tracking-tight'>{data.armada.length} Armada</h3>
        </a>
    <a href="/dashboard/paket-bundle" class='flex gap-3 flex-col items-center px-5 py-3 hover:bg-green-200 bg-green-100 cursor-pointer rounded-md'>
        <Package2 size={28} />
        <h3 class='text-gray-500 text-xl tracking-tight'>{data.bundle.length} Paket Bundle</h3>
    </a>
    <a href='/dashboard/reservasi' class='flex gap-3 flex-col items-center px-5 py-3 hover:bg-green-200 bg-green-100 cursor-pointer rounded-md'>
        <ClipboardClock size={28} />
        <h3 class='text-gray-500 text-xl tracking-tight'>{data.reservasi.length} Reservasi</h3>
    </a>
    <a href='/dashboard/customer' class='flex gap-3 flex-col items-center px-5 py-3 hover:bg-green-200 bg-green-100 cursor-pointer rounded-md'>
        <UsersRound size={28} />
        <h3 class='text-gray-500 text-xl tracking-tight'>{data.customer.length} Customer</h3>
    </a>
    </div>

</section>
