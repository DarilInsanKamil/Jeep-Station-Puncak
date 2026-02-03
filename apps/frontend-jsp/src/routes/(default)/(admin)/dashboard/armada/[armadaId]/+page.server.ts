import { client } from "$lib/api";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const armadaId = params.armadaId
  const { data, error } = await client.armada({ armadaId }).get()
  if (error) {
    return fail(404, {message: "Data tidak ditemukan"})
  }
  return data
}
