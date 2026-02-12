import { client } from '$lib/api';
import { redirect, type Handle } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = undefined;

  const token = event.cookies.get('accessToken');

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      const { data, error } = await client.users.me.post({
        userId: decoded.sub
      });

      if (!error && data?.success) {
        event.locals.user = data.response;
      } else {
        // Token tidak valid, hapus cookies
        event.cookies.delete('accessToken', { path: '/' });
        event.cookies.delete('refreshToken', { path: '/' });
      }
    } catch (e) {
      console.error("Auth error:", e);
      event.cookies.delete('accessToken', { path: '/' });
      event.cookies.delete('refreshToken', { path: '/' });
    }
  }

  if (event.url.pathname.startsWith('/dashboard')) {
    if (!event.locals.user || event.locals.user.role !== 'admin') {
      throw redirect(303, '/');
    }
  }

  return resolve(event);
};
