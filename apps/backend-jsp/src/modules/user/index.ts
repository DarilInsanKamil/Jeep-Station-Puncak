import Elysia, { status } from "elysia";
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
        '/register',
        async ({ body }) => {
            const response = await UserService.addUserPublic(body)
            return status(201, {
                message: 'Berhasil menambahkan user',
                id: response
            })
        }, {
        body: UserModel.UserPayload,
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
        response: {
            201: UserModel.UserSuccess,
            400: UserModel.ErrorResponse
        }
    }
    )
    .use(authGuard)
    .patch(
        '/edit',
        async ({ body, user }) => {
            const userId = user.id;
            const response = await UserService.editUser(userId, body)
            return status(200, {
                message: 'Berhasil edit data user',
                id: response
            })
        }, {
        body: UserModel.EditUserPayload,
        response: {
            200: UserModel.UserSuccess,
            400: UserModel.ErrorResponse
        }
    }
    )
