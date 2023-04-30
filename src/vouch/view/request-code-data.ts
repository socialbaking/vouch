import {FastifyInstance} from "fastify";
import {FromSchema} from "json-schema-to-ts";

export async function requestCodeDataRoutes(fastify: FastifyInstance) {

    const querystring = {
        type: "object",
        properties: {
        },
        required: [
        ]
    } as const;
    const schema = {
        description: "Retrieve public code data",
        tags: ["patient"],
        summary: "",
        querystring
    }

    type Schema = {
        Querystring: FromSchema<typeof querystring>
    }

    fastify.get<Schema>(
        "/request-code-data",
        {
            schema,
            async handler(request, response) {

            }
        }
    );
}