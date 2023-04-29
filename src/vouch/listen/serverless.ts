import * as dotenv from "dotenv";
dotenv.config();

import { create } from "./start";

const app = await create();

export async function handler(request: unknown, response: unknown) {
    await app.ready();
    app.server.emit('request', request, response);
}