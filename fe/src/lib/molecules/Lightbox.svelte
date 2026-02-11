<script>
  let { image, onClose } = $props();
</script>

{#if image}
  <div
    class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    role="button"
    tabindex="0"
    onclick={onClose}
    onkeydown={(e) => e.key === 'Enter' && onClose()}
  >
    <img
      src={image}
      class="max-h-[90vh] max-w-[90vw] rounded shadow-lg"
      onclick={(e) => e.stopPropagation()}
    />
  </div>
{/if}
