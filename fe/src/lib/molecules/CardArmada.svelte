<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    let {armada, href} = $props()
</script>


<div>
    <img src={`${Bun.env.BASE_URL}${armada.gambar_armada}`} alt={armada.id}>

    <div>
        <h3>{armada.nama_armada}</h3>
        <span>
        <p>{armada.kapasitas}</p>
        </span>
    </div>
    <div>
    <div>
        <p>Mulai dari</p>
        <p>{armada.harga_sewa}</p>
    </div>
    <a href={href}>
    <Button>
        Lihat Detail
    </Button>
    </a>
    </div>
</div>
