import Elysia, { status } from "elysia";
import { jwtPlugin } from "../../utils/jwtPlugin";
import { AuthError } from "../../errors/authError";
import { authGuard } from "../../utils/authGuard";
import { UserModel } from "../user/model";
import { UserService } from "../user/service";
import { AuthService } from "./service";
import { AuthModel } from "./model";

export const authentications = new Elysia({ prefix: '/auth' })
    .use(jwtPlugin)
    .error({ AUTH_ERROR: AuthError })
    .onError(({ code, error, set }) => {
        if (code === 'AUTH_ERROR') {
            set.status = error.status;
            return error.toResponse();
        }
    })
    .post(
        '/login',
        async ({ body, jwt: jwtService, cookie: { accessToken, refreshToken } }) => {
            const id = await UserService.verifyUserCredential(body)

            const accessJWTToken = await jwtService.sign({
                sub: id,
                exp: '900s',
            });
            const refreshJWTToken = await jwtService.sign({
                sub: id,
                exp: '7d',
            });

            await AuthService.addRefreshToken(refreshJWTToken)

            accessToken.set({
                value: accessJWTToken,
                httpOnly: true,
                maxAge: 900,
                path: "/",
            });

            refreshToken.set({
                value: refreshJWTToken,
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
            });

            return status(200, {
                accessToken: accessJWTToken,
                refreshToken: refreshJWTToken
            })
        }, {
        body: UserModel.verifyUserPayload,
        detail: {
            summary: "Login",
            tags: ['Authentications']
        },
        response: {
            200: AuthModel.AuthSuccess,
            400: AuthModel.ErrorResponse
        },
    }
    )
    .post(
        '/refresh',
        async ({ cookie: { accessToken, refreshToken }, set, jwt }) => {
            if (!refreshToken.value || typeof refreshToken.value !== 'string') {
                set.status = 'Unauthorized'
                throw Error('Tidak ada refresh token')
            }
            const jwtPayload = await jwt.verify(refreshToken.value)
            if (!jwtPayload) {
                set.status = 'Unauthorized'
                throw Error('Tidak ada refresh token')
            }

            const userId = jwtPayload.sub as string;
            await AuthService.verifyRefreshToken(refreshToken.value);

            const user = await UserService.getUserById(userId)

            if (!user) {
                set.status = 'Forbidden'
                throw Error('Refresh token tidak valid')
            }
            await AuthService.deleteRefreshToken(refreshToken.value)

            const accessJWTToken = await jwt.sign({
                sub: userId,
                exp: '900s',
            });

            const refreshJWTToken = await jwt.sign({
                sub: userId,
                exp: '7d',
            });

            await AuthService.addRefreshToken(refreshJWTToken);

            accessToken.set({
                value: accessJWTToken,
                httpOnly: true,
                maxAge: 900,
                path: "/",
            });

            refreshToken.set({
                value: refreshJWTToken,
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
            });

            return status(200, {
                message: 'access token berhasil di generate ulang'
            })
        }, {
        detail: {
            summary: "Refresh token",
            tags: ['Authentications']
        },
        response: {
            400: AuthModel.ErrorResponse
        }
    }
    )
    .use(authGuard)
    .post(
        '/logout',
        async ({ cookie: { accessToken, refreshToken } }) => {
            await AuthService.deleteRefreshToken(refreshToken.value as string)
            accessToken.remove()
            refreshToken.remove()
            return status(204)
        }, {
        detail: {
            summary: "Logout",
            tags: ['Authentications']
        },
    }
    )
