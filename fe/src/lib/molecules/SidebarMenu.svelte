<script>
    import { page } from "$app/state";
    import Button from "$lib/components/ui/button/button.svelte";
</script>

<div class="flex flex-col justify-between p-5 border-r h-screen">
    <ul class="">
            <a href="/dashboard/"
                class={`block p-2 rounded-sm hover:bg-green-50 ${
                   page.url.pathname === '/dashboard'
                     ? 'bg-green-100 text-green-700 font-semibold'
                     : ''
                 }`}
            >
        <li>
            Home
        </li>
            </a>
            <a href="/dashboard/armada"
                class={`block p-2 rounded-sm hover:bg-green-50 ${
                  page.url.pathname.startsWith('/dashboard/armada') ? 'bg-green-100 text-green-700 font-semibold' : ''
                }`}
            >
            Armada
            </a>
            <a href="/dashboard/paket-bundle"
                class={`block p-2 rounded-sm hover:bg-green-50 ${
                  page.url.pathname.startsWith('/dashboard/paket-bundle') ? 'bg-green-100 text-green-700 font-semibold' : ''
                }`}
                >
                Paket Bundle
            </a>
        <a href="/dashboard/customer"
            class={`block p-2 rounded-sm hover:bg-green-50 ${
              page.url.pathname.startsWith('/dashboard/customer') ? 'bg-green-100 text-green-700 font-semibold' : ''
            }`}
            >
                Customer
        </a>
            <a href="/dashboard/reservasi"
                class={`block p-2 rounded-sm hover:bg-green-50 ${
                  page.url.pathname.startsWith('/dashboard/reservasi') ? 'bg-green-100 text-green-700 font-semibold' : ''
                }`}
                >
                Reservasi
            </a>
            <a href="/dashboard/testimoni"
                class={`block p-2 rounded-sm hover:bg-green-50 ${
                  page.url.pathname.startsWith('/dashboard/testimoni') ? 'bg-green-100 text-green-700 font-semibold' : ''
                }`}
                >
                Testimoni
            </a>
            <a href="/dashboard/gallery"
                class={`block p-2 rounded-sm hover:bg-green-50 ${
                  page.url.pathname.startsWith('/dashboard/gallery') ? 'bg-green-100 text-green-700 font-semibold' : ''
                }`}
                >
                Gallery
            </a>
    </ul>
</div>
