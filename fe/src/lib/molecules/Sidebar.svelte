<script>
    import Button from "$lib/components/ui/button/button.svelte";
</script>

<div class="flex flex-col justify-between h-svh p-5 border-r">
    <ul class="">
            <a href="/dashboard/armada">
        <li class="p-2 hover:bg-blue-50 rounded-sm ">
            Armada
        </li>
            </a>
            <a href="/dashboard/paket-bundle">
        <li class="p-2 hover:bg-blue-50 rounded-sm">
                Paket Bundle
        </li>
            </a>
        <a href="/dashboard/customer">
            <li class="p-2 hover:bg-blue-50 rounded-sm">
                Customer
            </li>
        </a>
            <a href="/dashboard/reservasi">
        <li class="p-2 hover:bg-blue-50 rounded-sm">
                Reservasi
        </li>
            </a>
            <a href="/dashboard/testimoni">
        <li class="p-2 hover:bg-blue-50 rounded-sm">
                Testimoni
        </li>
            </a>
            <a href="/dashboard/gallery">
        <li class="p-2 hover:bg-blue-50 rounded-sm">
                Gallery
        </li>
            </a>
    </ul>
    <Button variant="destructive">
        Logout
    </Button>
</div>
