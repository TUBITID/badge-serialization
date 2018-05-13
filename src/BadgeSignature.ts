import { Badge, SignedBadge } from '../lib/models/tubitid-badge_pb';
import { HmacSHA512, lib, enc, LibWordArray } from 'crypto-js';
const models = require('./models/tubitid-badge_pb');

/**
 * Given an uint8array and a secret, calculates and returns a truncated hmac-sha512 signature.
 * @param {Uint8Array} bytes the bytes to calculate the hmac sha512 for.
 * @param {string} secret the secret for the hmac algorithm.
 * @param {number} bytesToReturn how many bytes to return from the hmac signature.
 * @return {Promise<Uint8Array>}
 */
function hmacSignUint8Arr(bytes : Uint8Array, secret : string, bytesToReturn : number) : Uint8Array {
    const libWordArr = lib.WordArray.create(bytes);
    const sign : LibWordArray = <any> HmacSHA512(libWordArr, secret);

    return Uint8Array.from(Array.from(
        enc.Latin1.stringify(sign).substring(0, bytesToReturn)
    ).map(x => x.charCodeAt(0)));
}

export class BadgeSignature {
    constructor(private readonly signSecret?: string){}

    /**
     * Signs the given badge with the instance's secret,
     * and creates a signed badge with a given amount of sign bytes
     * @param {Badge} badge the badge to sign
     * @param {number} bytesToStore how many bytes to store in the signed badge. max 64 bytes.
     * @return {Promise<Badge>}
     */
    async sign(badge: Badge, bytesToStore: number = 64) : Promise<SignedBadge> {
        const badgeBytes = badge.serializeBinary();
        const sign = hmacSignUint8Arr(badgeBytes, this.signSecret, bytesToStore);
        const signedBadge = new models.SignedBadge();

        signedBadge.setSignature(sign);
        signedBadge.setBadge(badge);

        return signedBadge;
    }

    /**
     * Given a signed badge instance, verifies its signature with the instance's secret.
     * @param {SignedBadge} signedBadge the signed badge to verify.
     * @return {Promise<Badge>} resolves the badge if the signature is true.
     */
    async verify(signedBadge : SignedBadge) : Promise<Badge>{
        const signature = signedBadge.getSignature();
        const badgeBytes = signedBadge.getBadge().serializeBinary();
        const sign = hmacSignUint8Arr(badgeBytes, this.signSecret, signature.length);

        if(sign.toString() !== signature.toString())
            throw new Error('could not verify signatures. the signature does not match the stored badge.');
        return signedBadge.getBadge();
    }
}

export default BadgeSignature;
