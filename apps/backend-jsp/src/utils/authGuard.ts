import { Elysia } from 'elysia';
import { jwtPlugin } from './jwtPlugin';
import { UserService } from '../modules/user/service';

export const authGuard = new Elysia()
    .use(jwtPlugin)
    .derive(async ({ cookie, jwt, set, request }) => {
        const authHeader =
            request.headers.get('authorization') ||
            request.headers.get('Authorization');

        let token = authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.slice(7)
            : cookie.accessToken?.value;

        if (!token) {
            set.status = 401;
            throw new Error('Unauthorized: Token missing');
        }

        const payload = await jwt.verify(token as string);

        if (!payload || !payload.sub) {
            set.status = 401;
            throw new Error('Invalid access token');
        }

        return {
            auth: {
                id: payload.sub as string,
                role: payload.role as string,
                email: payload.email as string,
                username: payload.username as string
            }
        };
    })
    .as('scoped')
