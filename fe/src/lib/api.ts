import { treaty } from '@elysiajs/eden';
import type { app } from '@jspapp/api';

export const client = treaty<app>('http://localhost:3000');
