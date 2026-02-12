<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import { toast } from "svelte-sonner";
    import type { PageProps } from "./$types";
    import {Eye, EyeOff} from '@lucide/svelte';
    import { enhance } from "$app/forms";

    let {form}: PageProps = $props()

    let isVisible = $state<boolean>(false);
    const handleChangeVisible = () => {
      isVisible = !isVisible;
    }
</script>

<section class="w-full h-svh flex justify-center flex-col items-center lg:p-0 p-5">
    <div class="text-center">
      <h1 class="text-4xl font-bold tracking-tighter text-green-950 mb-2">
        Selamat Datang
      </h1>
      <p class="text-gray-600">
        Masuk ke akun Jeep Station Puncak Anda
      </p>
    </div>

    <form action="?login" method="POST" class="lg:w-1/4 w-full bg-white shadow-sm p-5 rounded-md mt-5" use:enhance = {() => {
      return async({result, update}) => {
        if(result.type === 'redirect') {
          toast.success('Berhasil Login')
        } else if (result.type === 'failure') {
		  toast.error((result.data as { message?: string })?.message || "Terjadi kesalahan",);
		}
        await update();
      }
    }}>
        <div>
            <label for="email" class="font-semibold">
                Email
            </label>
            <br>
            <input
                type="email"
                name="email"
                value={form?.values?.email}
                placeholder="Masukan email"
                class="border mt-2 w-full border-black p-2 rounded-md"
                required
            >
        </div>
        <div class="mt-3">
            <label for="password" class="font-semibold">
                Password
            </label>
            <br>
            <div class="relative">
            <input
                type={isVisible ? 'text' : 'password'}
                name="password"
                value={form?.values?.password}
                placeholder="Masukan Password"
                class="border mt-2 w-full border-black p-2 rounded-md"
                required
            >
            <button
                type="button"
                onclick={handleChangeVisible}
                class="absolute right-3 top-5"
                aria-label={isVisible ? 'Sembunyikan password' : 'Lihat password'}
            >
            {#if isVisible}
                <Eye size={20} color="#b5b5b5"/>
            {:else}
                <EyeOff size={20} color="#b5b5b5"/>
            {/if}
            </button>
            </div>
        </div>
        <div class="flex flex-col justify-center items-center mt-5 gap-2">
            <Button type='submit' class='w-full bg-green-900 hover:bg-green-800'>Login</Button>
            <p class="text-sm text-gray-500">Belum punya akun?</p>
            <a href="/signup" class="border w-full p-1.5 text-center rounded-md border-black outline-black hover:bg-green-100 transition-all">
                Register
            </a>
        </div>
    </form>
</section>
