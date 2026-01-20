import { treaty } from '@elysiajs/eden'
import type { app } from "@apps/backend-jsp"

export const client = treaty<app>('localhost:3000')