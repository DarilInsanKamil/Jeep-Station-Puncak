import { Elysia } from "elysia";
import { users } from "./modules/user";
import { logger } from "@bogeychan/elysia-logger";
// import staticPlugin from "@elysiajs/static";
import { authentications } from "./modules/auth";
import { armada } from "./modules/armada";
import { testimoni } from "./modules/testimoni";

const app = new Elysia()
  .use(
    logger({
      level: "info",
    })
  )
  // .use(staticPlugin())
  .use(authentications)
  .use(users)
  .use(armada)
  .use(testimoni)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${Bun.env.hostname}:${Bun.env.port}`
);

export type app = typeof app