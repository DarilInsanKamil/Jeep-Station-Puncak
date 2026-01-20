import { Elysia } from "elysia";
import { users } from "./modules/user";
import { logger } from "@bogeychan/elysia-logger";
import staticPlugin from "@elysiajs/static";
import { authentications } from "./modules/auth";

const app = new Elysia()
  .use(
    logger({
      level: "info",
    })
  )
  // .use(staticPlugin())
  .use(authentications)
  .use(users)
  .get("/profile", () => {
    return {
      success: true,
      data: {
        name: 'Pengguna Contoh',
        email: 'contoh@email.com',
      },
    };
  }).listen(3000);

console.log(
  `🦊 Elysia is running at ${Bun.env.hostname}:${Bun.env.port}`
);

export type app = typeof app