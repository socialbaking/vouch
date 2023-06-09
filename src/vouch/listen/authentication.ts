import {requestContext} from "@fastify/request-context";
import {ok} from "../../is";
import {getPartner} from "./bearer-authentication";

export * from "./bearer-authentication";

const AUTHORIZED_PARTNER_ID_KEY = "authorizedForPartnerIds";

export function setAuthorizedForPartnerId(partnerId: string) {
    requestContext.set(AUTHORIZED_PARTNER_ID_KEY, partnerId)
}

export function getMaybeAuthorizedForPartnerId() {
    return requestContext.get(AUTHORIZED_PARTNER_ID_KEY);
}

export function getAuthorizedForPartnerId(): string {
    const partnerId = getMaybeAuthorizedForPartnerId();
    ok(partnerId, "Expected partner authorization")
    return partnerId;
}

export function validateAuthorizedForPartnerId(partnerId: string): asserts partnerId {
    const authorizedPartnerId = getAuthorizedForPartnerId();
    ok(authorizedPartnerId === partnerId, "Expected partner authorization to match");
}

export function ensurePartnerMatchIfUnapproved(partnerId: string): asserts partnerId {
    const { approved } = getPartner();
    if (process.env.VOUCH_REQUIRE_PARTNER_APPROVAL && !approved) {
        validateAuthorizedForPartnerId(partnerId);
    }
}