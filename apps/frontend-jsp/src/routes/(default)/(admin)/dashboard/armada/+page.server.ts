import { client } from "$lib/api";
import { withAuth } from "$lib/hooks";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


export const actions = {
  delete: async ({ cookies, request }) => {
    const formData = await request.formData()
    const armadaId = formData.get('id')?.toString() ?? '';

    const { error } = await withAuth(cookies, async (token) => {
      return await client.armada({ armadaId }).delete(
          undefined,
          {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
      )
    })
    if (error) {
      return fail(error.status ?? 400, {
        error: true,
        message: typeof error.value === 'object' ? (error.value as any).message : error.value,
      });
    }
    return {
      success: true
    }
  }
} satisfies Actions

export const load: PageServerLoad = async ({ url, cookies }) => {
  const search = url.searchParams.get('search') ?? '';
  const page = Number(url.searchParams.get('page') ?? '1');
  const limit = Number(url.searchParams.get('limit') ?? '10');
  const kapasitasParam = url.searchParams.get('kapasitas');
  const kapasitas = kapasitasParam ? Number(kapasitasParam) : undefined;
  const { data, error } = await client.armada.get({
    query: {
      page,
      limit,
      search,
      kapasitas,
    }
  })


  if (error) {
    console.error('Gagal load armada:', error);
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
