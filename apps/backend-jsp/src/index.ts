import { Elysia } from "elysia";
import { users } from "./modules/user";
import { logger } from "@bogeychan/elysia-logger";
import staticPlugin from "@elysiajs/static";
import { fromTypes, openapi } from '@elysiajs/openapi'
import { cors } from '@elysiajs/cors';
import { authentications } from "./modules/auth";
import { armada } from "./modules/armada";
import { testimoni } from "./modules/testimoni";
import { gallery } from "./modules/gallery";
import { customer } from "./modules/customer";
import { reservasi } from "./modules/reservasi";
import { bundles } from "./modules/bundles";

const app = new Elysia()
  .use(
    logger({
      level: "info",
    })
  )
  .use(staticPlugin({
    assets: "public",
    prefix: "/public"
  }))
  .use(openapi({
    documentation: {
      info: {
        title: 'Jeep Station Puncak API',
        version: '1.0.0'
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ]
    }
  }))
  .use(cors({
    origin: '*'
  }))
  .use(users)
  .use(authentications)
  .use(armada)
  .use(testimoni)
  .use(gallery)
  .use(customer)
  .use(bundles)
  .use(reservasi)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${Bun.env.hostname}:${Bun.env.port}`
);

export type app = typeof app
