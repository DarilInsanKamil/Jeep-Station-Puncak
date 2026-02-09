import { client } from "$lib/api";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ params }) => {
  const bundleId = params.bundleId

  const {data, error} = await client.bundles({ bundleId }).get()
  if (error) {
    console.error('Data tidak ada:', error)
  }
  return {
    success: true,
    bundle: data
  }
}
