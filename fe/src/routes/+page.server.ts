import { client } from '$lib/api'

export const load = async () => {
  const [
    { data: armada, error: armadaError },
    { data: testimoni, error: testimoniError },
    { data: gallery, error: galleryError },
    { data: bundle, error: bundleError }
  ] = await Promise.all([
    client.armada.get({ query: { limit: 4 } }),
    client.testimoni.get({ query: { limit: 4 } }),
    client.gallery.get({ query: { limit: 4 } }),
    client.bundles.get({ query: { limit: 4 } })
  ])

  if (armadaError && testimoniError && galleryError && bundleError) {
    console.error('Gagal memuat data: ', armadaError)
  }

  return {
    success: true,
    armada: armada ?? [],
    testimoni: testimoni ?? [],
    gallery: gallery ?? [],
    bundle: bundle ?? []
  }
}
