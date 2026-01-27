<script>
  import logo from "$lib/assets/logo.png";
  import { cn } from "$lib/utils";

  let scrollY = $state(0);
</script>

<svelte:window bind:scrollY />

<div
  class={cn(
    "fixed top-0 z-50 flex w-full items-center justify-between px-20 transition-all duration-300",
    scrollY > 50
      ? "bg-white py-2 text-black shadow-md"
      : "bg-transparent py-3 text-white",
  )}
>
  <div>
    <img src={logo} alt="logo"
    class={cn("transition-all duration-300", scrollY > 50 && "brightness-0 invert-0")}
    
    />
  </div>
  <ul class="flex gap-15 float-right">
    <li>
      <a href="./home">Home</a>
    </li>
    <li>
      <a href="./home">Paket Bundling</a>
    </li>
    <li>
      <a href="./home">List Armada</a>
    </li>
    <li>
      <a href="./home">Testimoni</a>
    </li>
    <li>
      <a href="./home">Gallery</a>
    </li>
  </ul>
</div>
