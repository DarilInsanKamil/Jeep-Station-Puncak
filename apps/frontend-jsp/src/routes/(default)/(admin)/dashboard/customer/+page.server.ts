import { client } from "$lib/api";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ url, cookies}) => {
  const search = url.searchParams.get('search') ?? '';
  const page = Number(url.searchParams.get('page') ?? '1');
  const limit = Number(url.searchParams.get('limit') ?? '10');
  const { data, error } = await client.customer.get({
    query: {
      page,limit, search
    }
  })

  if (error) {
    console.error('Gagal load data customer: ', error)
  }

  return {
    data: data ?? [],
    searchParams: { search },
    meta: {
      page,
      limit
    }
  }
}
