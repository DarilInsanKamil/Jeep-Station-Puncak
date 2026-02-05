<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { enhance } from '$app/forms';

</script>

<Dialog.Root>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>Data Pemesan</Dialog.Title>
        </Dialog.Header>

            <div class="grid grid-cols-4 items-center gap-4">
                <label for="nama_lengkap" class="text-right text-sm font-medium">Nama</label>
                <input name="nama_lengkap" class="col-span-3 border p-2 rounded" required />
            </div>
             <div class="grid grid-cols-4 items-center gap-4">
                <label for="email" class="text-right text-sm font-medium">Email</label>
                <input name="email" type="email" class="col-span-3 border p-2 rounded" required />
            </div>
             <div class="grid grid-cols-4 items-center gap-4">
                <label for="no_hp" class="text-right text-sm font-medium">No HP</label>
                <input name="no_hp" class="col-span-3 border p-2 rounded" required />
            </div>
             <div class="grid grid-cols-4 items-center gap-4">
                <label for="alamat" class="text-right text-sm font-medium">Alamat</label>
                <input name="alamat" class="col-span-3 border p-2 rounded" required />
            </div>

            <Dialog.Footer>
                <Button type="submit">
                </Button>
            </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
