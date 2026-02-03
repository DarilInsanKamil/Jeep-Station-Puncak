import Elysia from "elysia";
import { authGuard } from "./authGuard";

interface User {
    id: string, username: string, email: string, role: string
}
export const adminGuard = new Elysia()
    .use(authGuard)
    .derive(({ auth, set }) => {
        if (auth.role !== 'admin') {
            set.status = 403;
            throw new Error('Forbidden: Access denied. Admins only.');
        }
        return {
            auth
        };
    })
    .as('scoped')