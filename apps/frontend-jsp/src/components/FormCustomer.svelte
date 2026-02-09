<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { enhance } from '$app/forms';

</script>

<Dialog.Root>
    <Dialog.Trigger>
        <Button>
            Lanjutkan Pemesanan
        </Button>
    </Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Data Pemesan</Dialog.Title>
        </Dialog.Header>
        <form method="POST" use:enhance class="space-y-4 py-4">
            <div class="space-y-2">
                <label for="nama_lengkap" class="block text-sm font-medium text-gray-700">
                    Nama Lengkap <span class="text-red-500">*</span>
                </label>
                <input
                    id="nama_lengkap"
                    name="nama_lengkap"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-950 focus:border-transparent"
                    placeholder="Masukkan nama lengkap"
                    required
                />
            </div>

            <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">
                    Email <span class="text-red-500">*</span>
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-950 focus:border-transparent"
                    placeholder="contoh@email.com"
                    required
                />
            </div>

            <div class="space-y-2">
                <label for="no_hp" class="block text-sm font-medium text-gray-700">
                    No. HP <span class="text-red-500">*</span>
                </label>
                <input
                    id="no_hp"
                    name="no_hp"
                    type="tel"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-950 focus:border-transparent"
                    placeholder="08xxxxxxxxxx"
                    required
                />
            </div>

            <div class="space-y-2">
                <label for="alamat" class="block text-sm font-medium text-gray-700">
                    Alamat <span class="text-red-500">*</span>
                </label>
                <textarea
                    id="alamat"
                    name="alamat"
                    rows="3"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-950 focus:border-transparent"
                    placeholder="Masukkan alamat lengkap"
                    required
                ></textarea>
            </div>

            <Dialog.Footer>
                <Button type="submit" class="w-full bg-green-950 hover:bg-green-900">
                    Simpan Data
                </Button>
            </Dialog.Footer>
        </form>
    </Dialog.Content>
</Dialog.Root>
