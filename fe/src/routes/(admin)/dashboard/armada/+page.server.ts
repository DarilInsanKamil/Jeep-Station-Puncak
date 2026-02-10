import { client } from "$lib/api";
import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { withAuth } from "$lib";


export const actions: Actions = {
  default: async ({cookies, request}) => {
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
      })
    }
    return {
      success: true
    }
  }
}


export const load: PageServerLoad = async ({ url }) => {
  const search = url.searchParams.get('search') ?? '';
  const page = Number(url.searchParams.get('page') ?? '1');
  const limit = Number(url.searchParams.get('limit') ?? '10');
  const kapasitasParam = url.searchParams.get('kapasitas');
  const kapasitas = kapasitasParam ? Number(kapasitasParam) : undefined;

  const { data, error } = await client.armada.get({
    query: {
      search, kapasitas, page, limit
    }
  })

  if (error) {
    console.error('Gagal load armada:', error);
  }

  return {
    success: true,
    data: data ?? [],
    searchParams: { search },
    meta: {
      page,
      limit
    }
  }
}
