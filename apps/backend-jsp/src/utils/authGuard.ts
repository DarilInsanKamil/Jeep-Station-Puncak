import { Elysia } from 'elysia';
import { jwtPlugin } from './jwtPlugin';
import { UserService } from '../modules/user/service';

export const authGuard = new Elysia()
    .use(jwtPlugin)
    .derive(async ({ cookie, jwt, set, request }) => {
        const authHeader = request.headers.get('authorization');
        let token = authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.slice(7)
            : null;

        if (!token) {
            token = (cookie.accessToken?.value as string) || null;
        }

        if (!token) {
            set.status = 401;
            throw new Error('Unauthorized: Token missing');
        }

        const payload = await jwt.verify(token as string);

        if (!payload || !payload.sub) {
            set.status = 401;
            throw new Error('Invalid access token');
        }

        const user = await UserService.getUserById(payload.sub as string)
        console.log(user)
        return {
            user: user
        };
    })
    .as('scoped')
