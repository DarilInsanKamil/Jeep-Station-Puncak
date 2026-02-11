<script lang='ts'>
    import { enhance } from "$app/forms";
    import Button from "$lib/components/ui/button/button.svelte";
    import { toast } from "svelte-sonner";
    import type { PageProps } from "./$types";

    let {form}:PageProps = $props();
</script>


<section class="lg:p-10 p-5 w-full ">
    <form action="?create" method="POST" class="grid lg:gap-5 gap-3 lg:w-1/2 w-full" use:enhance={() => {
      return async({result, update}) => {
        if(result.type === 'success') {
          toast.success('Berhasil Menambah data')
        } else if (result.type === 'failure') {
          toast.error((result.data as { message?: string })?.message || "Terjadi kesalahan")
        }
        await update()
      }
    }}>
        <div>
            <label for="nama" class="font-semibold">
                Nama *
            </label>
            <br>
            <input
                type="text"
                name="name"
                value={form?.values?.name}
                placeholder="Masukan nama"
                class="border mt-2 w-full border-black p-2 rounded-md"
                required
            >
        </div>
        <div>
            <label for="rating" class="font-semibold">
                Rating *
            </label>
            <br>
            <input
                type="number"
                name="rating"
                value={form?.values?.rating}
                placeholder="Masukan harga sewa/hari"
                class="border mt-2 w-full border-black p-2 rounded-md"
                required
            >
        </div>
        <div>
            <label for="komentar" class="font-semibold">
                Komentar *
            </label>
            <br>
            <textarea name="komentar" placeholder="Masukan Komentar" class="border mt-2 w-full border-black p-2 rounded-md" required>
                {form?.values?.komentar}
            </textarea>
        </div>
        <Button type='submit'>Upload Data Testimoni</Button>
    </form>
</section>
