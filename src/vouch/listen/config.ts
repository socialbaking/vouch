import {Server} from "node:http";
import {ok} from "../../is";

export function getPort() {
    const env = process.env.PORT;
    if (env && /^\d+$/.test(env)) {
        return +env;
    }
    return 0; // random;
}

export function getHostname() {
    if (process.env.SERVER_EXTERNAL_URL_HOSTNAME) {
        return process.env.SERVER_EXTERNAL_URL_HOSTNAME;
    }

    const port = getPort();

    ok(port);

    return `http://localhost:${port}`;
}