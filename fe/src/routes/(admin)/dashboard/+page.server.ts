import { client } from "$lib/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const [
      { data: armada },
      { data: bundle },
    { data: reservasi },
      { data: customer }
    ] = await Promise.all([
      client.armada.get(),
      client.bundles.get(),
      client.reservasi.get(),
      client.customer.get()
    ]);

    return { armada: armada ?? [], bundle: bundle ?? [], reservasi: reservasi ?? [], customer: customer ?? [] };
}
