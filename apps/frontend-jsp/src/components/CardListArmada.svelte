<script lang="ts">
    import { page } from '$app/stores'; // Ambil akses ke URL saat ini
    let { armada } = $props();

</script>

<div class="card">
    <img src={armada.gambar} alt={armada.nama} />
    <h3>{armada.nama}</h3>
</div>
