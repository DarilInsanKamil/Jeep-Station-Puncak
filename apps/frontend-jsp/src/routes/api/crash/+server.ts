import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
    throw new Error("API Server Endpoint Crash!");
};