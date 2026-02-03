import { client } from "$lib/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const armadaId = params.armadaId
  const { data, error } = await client.armada({ armadaId }).get()

  return data
}
