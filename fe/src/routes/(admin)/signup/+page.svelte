<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import { toast } from "svelte-sonner";
    import {Eye, EyeOff} from '@lucide/svelte';
    import type { PageProps } from "./$types";
    import { enhance } from "$app/forms";

    let {form}: PageProps = $props()

    let isVisible = $state<boolean>(false);
    const handleChangeVisible = () => {
      isVisible = !isVisible;
    }
</script>


<section class="w-full h-svh flex justify-center items-center lg:p-0 p-5 flex-col">
    <div class="text-center">
      <h1 class="text-4xl font-bold tracking-tighter text-green-950 mb-2">
        Buat Akun Baru
      </h1>
      <p class="text-gray-600">
        Daftar untuk menikmati kemudahan reservasi jeep
      </p>
    </div>
    <form action="?signup" method="POST" class="lg:w-1/4 w-full p-5 bg-white shadow-sm rounded-md mt-5" use:enhance = {() => {
      return async({result, update}) => {
        if(result.type === 'success') {
          toast.success('Berhasil Membuat Akun')
        } else {
          toast.error(result.data?.message || 'Gagal membuat akun')
        }
        await update();
      }
    }}>
        <div>
            <label for="username" class="font-semibold">
                Username
            </label>
            <br>
            <input
                type="username"
                name="username"
                value={form?.values?.username}
                placeholder="Masukan username"
                class="border mt-2 w-full border-black p-2 rounded-md"
                required
            >
        </div>
        <div class="mt-3">
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
        <div class="mt-3">
            <label for="role" class="font-semibold">
                Role
            </label>
        <div>
            <input
                type="radio"
                name="role"
                value="admin"
                checked
            >
            <label for="role" class="font-semibold">
                Admin
            </label>
        </div>
        <div>
            <input
                type="radio"
                name="role"
                value="user"
                required
            >
            <label for="role" class="font-semibold">
                User
            </label>
        </div>
        </div>
        <div class="flex flex-col justify-center items-center mt-5 gap-2">
            <Button type='submit' class='w-full bg-green-900 hover:bg-green-800'>Sign up</Button>
            <p class="text-sm text-gray-500">Sudah punya akun?</p>
            <a href="/login" class="border w-full p-1.5 text-center rounded-md border-black outline-black hover:bg-green-100 transition-all">
                Login
            </a>
        </div>
    </form>
</section>
