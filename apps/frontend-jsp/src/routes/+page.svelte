<script lang="ts">
  import FaqSection from "../components/landingpage/FaqSection.svelte";
  import HeroSection from "../components/landingpage/HeroSection.svelte";
  import ListArmadaSection from "../components/landingpage/ListArmadaSection.svelte";
  import PaketBundleSection from "../components/landingpage/PaketBundleSection.svelte";
  import TestimoniSection from "../components/landingpage/TestimoniSection.svelte";
</script>

<svelte:head>
  <title>Jeep Station Puncak</title>
</svelte:head>
<div class="bg-green-950">
  <section>
    <HeroSection />
  </section>
  <section class="px-20">
    <PaketBundleSection />
  </section>
  <section class="px-20 py-10">
    <ListArmadaSection />
  </section>
  <section class="px-20">
    <TestimoniSection />
  </section>
  <section class="px-20 py-10">
    <FaqSection />
  </section>
</div>
