<script lang='ts'>
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Dialog from "$lib/components/ui/dialog/index.js";

    let {
      open = $bindable(false),
      title = "Konfirmasi",
      message = "Apakah Anda yakin?",
      onConfirm = () => {},
      confirmText = "Ya, Hapus",
      cancelText = "Batal",
      variant = "destructive"
    } = $props();

    function handleConfirm() {
      onConfirm();
      open = false;
    }
  </script>

  <Dialog.Root bind:open>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{message}</Dialog.Description>
      </Dialog.Header>

      <Dialog.Footer>
        <Button variant="outline" onclick={() => open = false}>
          {cancelText}
        </Button>
        <Button onclick={handleConfirm}>
          {confirmText}
        </Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
