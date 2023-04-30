import { listen } from "@virtualstate/listen";
import fastify from "fastify";
import {routes} from "./routes";
import {setupSwagger} from "./swagger";
import blippPlugin from "fastify-blipp";
import corsPlugin from "@fastify/cors";
import {getPort} from "./config";
import {fastifyRequestContext, requestContext} from "@fastify/request-context";
import helmet from "@fastify/helmet";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const { pathname } = new URL(import.meta.url);
const directory = dirname(pathname)

async function initRedisMemory() {
    const { RedisMemoryServer } = await import("redis-memory-server")
    const redisServer = new RedisMemoryServer();

    const host = await redisServer.getHost();
    const port = await redisServer.getPort();

    process.env.REDIS_URL = `redis://${host}:${port}`;
}

export async function create() {

    if (process.env.REDIS_MEMORY && !process.env.REDIS_URL) {
        await initRedisMemory();
    }

    const app = fastify({
        logger: true
    });

    const packageJSON = await readFile(join(directory, "../../../package.json"), "utf-8")
    const {
        name,
        version
    } = JSON.parse(packageJSON);

    app.register(helmet, { contentSecurityPolicy: false });

    app.addHook(
        "preValidation",
        async (request, response) => {
            requestContext.set("hostname", request.hostname);

            response.header("X-Powered-By", `${name}@${version}`);
        }
    )

    app.register(fastifyRequestContext, {
        hook: 'preValidation',
        defaultStoreValues: {

        }
    });

    app.register(blippPlugin);
    app.register(corsPlugin);

    await setupSwagger(app);

    app.register(routes);

    return app;
}

export async function start() {
    const app = await create();

    const port = getPort();

    await app.listen({ port });

    app.blipp();

    return () => {
        return app.close();
    }
}