import Elysia, { status, t } from "elysia";
import { UserService } from "./service";
import { UserModel } from "./model";
import { UserError } from "../../errors/userError";
import { authGuard } from "../../utils/authGuard";

export const users = new Elysia({ prefix: '/users' })
    .error({ USER_ERROR: UserError })
    .onError(({ code, error, set }) => {
        if (code === 'USER_ERROR') {
            set.status = error.status;
            return error.toResponse();
        }
    })
    .post(
      '/me',
      async ({body}) => {
        const {userId} = body
        const response = await UserService.getUserById(userId)
        return {
          success: true,
          response
        }
    }, {
        body: t.Object({
          userId: t.String()
        }),
        response: {
            200: UserModel.MeResponse,
            404: UserModel.ErrorResponse
        },
        detail: {
            summary: "Get user by ID",
            tags: ['Users']
        }
    })
    .post(
        '/register',
        async ({ body }) => {
            const response = await UserService.addUserPublic(body)
            return status(201, {
                message: 'Berhasil menambahkan user',
                id: response
            })
        }, {
        body: UserModel.UserPayload,
        detail: {
            summary: "Register user public",
            tags: ['Users']
        },
        response: {
            201: UserModel.UserSuccess,
            400: UserModel.ErrorResponse
        }
    }
    )
    .post(
        '/admin/register',
        async ({ body }) => {
            const response = await UserService.addUser(body)
            return status(201, {
                message: 'Berhasil menambahkan user',
                id: response
            })
        }, {
        body: UserModel.UserPayload,
        detail: {
            summary: "Register user admin",
            tags: ['Users']
        },
        response: {
            201: UserModel.UserSuccess,
            400: UserModel.ErrorResponse
        }
    }
    )
    .use(authGuard)
    .patch(
        '/edit',
        async ({ body, auth }) => {
            const userId = auth.id;
            const response = await UserService.editUser(userId, body)
            return status(200, {
                message: 'Berhasil edit data user',
                id: response
            })
        }, {
        body: UserModel.EditUserPayload,
        detail: {
            summary: "Edit user",
            tags: ['Users']
        },
        response: {
            200: UserModel.UserSuccess,
            400: UserModel.ErrorResponse
        }
    }
    )
