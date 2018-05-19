import { HmacSHA512, lib, enc, LibWordArray } from 'crypto-js';
import { wordArrayToUint8Array } from './utils';

/**
 * Given an uint8array and a secret, calculates and returns a truncated hmac-sha512 signature.
 * @param {Uint8Array} bytes the bytes to calculate the hmac sha512 for.
 * @param {string} secret the secret for the hmac algorithm.
 * @param {number} bytesToReturn how many bytes to return from the hmac signature.
 * @return {Promise<Array<number>>}
 */
function hmacSignUint8Arr(bytes : Uint8Array, secret : string, bytesToReturn : number) : Uint8Array {
    const libWordArr = lib.WordArray.create(bytes);
    const sign : LibWordArray = <any> HmacSHA512(libWordArr, secret);

    return wordArrayToUint8Array(sign, bytesToReturn);
}

export class BadgeSignature {
    constructor(private readonly signSecret: string){}

    /**
     * Signs the given uint8arr with the instance's secret.
     * and creates a new array with a hmac sign that is given amount of bytes
     * @param {Uint8Array} uint8Arr bytes to sign
     * @param {number} bytesToStore how many bytes to store in the signed data. max 64 bytes. min 1 bytes.
     * @return {Promise<Badge>}
     */
    sign = async (uint8Arr: Uint8Array, bytesToStore: number = 64) : Promise<Uint8Array> => {
        if(bytesToStore < 1 || bytesToStore > 64)
            throw new Error('signature size should be between 1 and 64');
        const sign = hmacSignUint8Arr(uint8Arr, this.signSecret, bytesToStore);

        const result = new Uint8Array(1 + sign.length + uint8Arr.length);
        result.set([sign.length], 0);
        result.set(sign, 1);
        result.set(uint8Arr, 1 + sign.length);
        return result;
    };

    /**
     * Given a signed badge instance, verifies its signature with the instance's secret.
     * @param {Uint8Array} signedBytes the signed badge to verify.
     * @return {Promise<Badge>} resolves the badge if the signature is true.
     */
    verify = async (signedBytes : Uint8Array) : Promise<Uint8Array> => {
        const signatureLength = signedBytes[0];
        // there needs to be at least 1 byte of data after signature.
        if(signatureLength >= signedBytes.length - 1)
            throw new Error('too big of a signature length for the given array.');
        const badgeBytes = signedBytes.slice(signatureLength + 1);
        const sign = hmacSignUint8Arr(badgeBytes, this.signSecret, signatureLength);

        if(sign.toString() !== signedBytes.slice(1, signatureLength + 1).toString())
            throw new Error('could not verify signatures. the signature does not match the stored badge.');
        return Uint8Array.from(badgeBytes);
    };
}

export default BadgeSignature;
