import {acceptUniqueCodeRoutes} from "./accept-unique-code";
import {assignUniqueCodeRoutes} from "./assign-unique-code";
import {addPartnerRoutes} from "./add-partner";
import {verifyCodeValidityRoutes} from "./verify-code-validity";
import {generateUniqueCodeRoutes} from "./generate-unique-code";
import {retrieveSystemLogsRoutes} from "./retrieve-system-logs";
import {retrieveCodeDataRoutes} from "./retrieve-code-data";
import {retrieveCodeDetailsRoutes} from "./retrieve-code-public-details";
import {FastifyInstance} from "fastify";
import {processPaymentRoutes} from "./process-payment-transfer";
import {retrieveCodesRoutes} from "./retrieve-codes";
import {retrievePartnerRoutes} from "./retrieve-partners";
import {viewRoutes} from "../view";

export async function routes(fastify: FastifyInstance) {

    async function apiRoutes(fastify: FastifyInstance) {
        fastify.register(acceptUniqueCodeRoutes);
        fastify.register(assignUniqueCodeRoutes);
        fastify.register(addPartnerRoutes);
        fastify.register(verifyCodeValidityRoutes);
        fastify.register(generateUniqueCodeRoutes);
        fastify.register(retrieveSystemLogsRoutes);
        fastify.register(retrieveCodeDataRoutes);
        fastify.register(retrieveCodeDetailsRoutes);
        fastify.register(processPaymentRoutes);
        fastify.register(retrieveCodesRoutes);
        fastify.register(retrievePartnerRoutes);
    }

    fastify.register(apiRoutes, {
        prefix: "/api/version/1"
    });
    fastify.register(viewRoutes);
}