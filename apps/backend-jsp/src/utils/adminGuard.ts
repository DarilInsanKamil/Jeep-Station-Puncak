import Elysia from "elysia";
import { authGuard } from "./authGuard";

interface User {
    id: string, username: string, email: string, role: string
}
export const adminGuard = new Elysia()
    .use(authGuard)
    .derive(({ user, set }) => {
        if (user.role !== 'admin') {
            set.status = 403;
            throw new Error('Forbidden: Access denied. Admins only.');
        }
        return {
            user
        };
    })
    .as('scoped')