import { HmacSHA512, MD5, lib, enc, LibWordArray } from 'crypto-js';
import { wordArrayToUint8Array } from './utils';
import { Buffer } from 'buffer/';
import { ec as EC } from 'elliptic';

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

function md5Hex(bytes: Uint8Array) : string {
    return MD5(lib.WordArray.create(bytes)).toString(enc.Hex);
}

function uintToHex(uint8Arr: Uint8Array) : string {
    return new Buffer(uint8Arr).toString('hex');
}

export interface SignatureFactory {
    /**
     * Sign the bytes and if possible truncate the signature.
     * @param {Uint8Array} bytes
     * @param {number} wantedSignatureLength
     * @return {Uint8Array}
     */
    sign(bytes: Uint8Array, wantedSignatureLength: number) : Uint8Array
    verify(bytes: Uint8Array, signature: Uint8Array) : boolean
}

export class HMACSignatureFactory implements SignatureFactory {
    constructor(private readonly signSecret: string){}

    sign = (bytes: Uint8Array, bytesToReturn: number): Uint8Array => {
        if(bytesToReturn < 1 || bytesToReturn > 64)
            throw new Error('signature size should be between 1 and 64');
        if(bytesToReturn === 0) return Uint8Array.from([]);

        return hmacSignUint8Arr(bytes, this.signSecret, bytesToReturn);
    };

    verify = (bytes: Uint8Array, signature: Uint8Array): boolean => {
        const calculated = this.sign(bytes, signature.length);
        return calculated.toString() === signature.toString();
    };
}

export enum ECDSACurve {
    SECP256K1 = "secp256k1",
    p192 = "p192",
    p224 = "p224",
    p256 = "p256",
    p384 = "p384",
    ed25519 = "ed25519",
}

function createKeyPair(ec: any) : { priv: Uint8Array, pub: Uint8Array } {
    // @ts-ignore
    const key = ec.genKeyPair({ entropy: wordArrayToUint8Array(lib.WordArray.random(32)) });

    const priv = Uint8Array.from(key.getPrivate().toArray());
    const pubKey = key.getPublic().encode('hex');
    const pub = new Buffer(pubKey, 'hex');

    return { priv, pub: Uint8Array.from(pub) };
}

const signaturePartSize = {
    [ECDSACurve.SECP256K1]: 32,
    [ECDSACurve.p192]: 24,
    [ECDSACurve.p224]: 28,
    [ECDSACurve.p256]: 32,
    [ECDSACurve.p384]: 48,
    [ECDSACurve.ed25519]: 32,
};

export class ECDSASignatureFactory implements SignatureFactory {
    private ec : any;
    private partSize: number;
    private pubKey : any;
    private privKey? : any;

    constructor(
        ecdsaCurve : ECDSACurve,
        signPublic: Uint8Array,
        signSecret?: Uint8Array,
    ){
        this.ec = new EC(ecdsaCurve.toString());
        this.partSize = signaturePartSize[ecdsaCurve];
        // @ts-ignore
        this.pubKey = this.ec.keyFromPublic(uintToHex(signPublic), 'hex');
        if(signSecret)
            this.privKey = this.ec.keyFromPrivate(uintToHex(signSecret), 'hex');
    }

    sign(bytes: Uint8Array, wantedSignatureLength: number): Uint8Array {
        if(!this.privKey)
            throw new Error('can not sign without secret key when using ecdsa');
        const hash = md5Hex(bytes);

        const signature = this.privKey.sign(hash);

        return Uint8Array.from(
            signature.r.toArray('be', this.partSize)
                .concat(signature.s.toArray('be', this.partSize))
        );
    }

    verify(bytes: Uint8Array, signature: Uint8Array): boolean {
        const sigHex = uintToHex(signature);
        const halfSignature = sigHex.length / 2;
        const r = sigHex.substring(0, halfSignature);
        const s = sigHex.substring(halfSignature);
        const hash = md5Hex(bytes);

        return this.pubKey.verify(hash, { r, s });
    }
}


export class BadgeSignature {
    //private signatureFactory : SignatureFactory;

    constructor(private readonly signatureFactory: SignatureFactory){}

    /**
     * Signs the given uint8arr with the instance's secret.
     * and creates a new array with a hmac sign that is given amount of bytes
     * @param {Uint8Array} uint8Arr bytes to sign
     * @param {number} bytesToStore how many bytes to store in the signed data. max 64 bytes. min 1 bytes.
     * @return {Promise<Badge>}
     */
    sign = async (uint8Arr: Uint8Array, bytesToStore: number = 64) : Promise<Uint8Array> => {
        const sign = this.signatureFactory.sign(uint8Arr, bytesToStore);

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
        const signature = signedBytes.slice(1, signatureLength + 1);
        const badgeBytes = signedBytes.slice(signatureLength + 1);

        if(this.signatureFactory.verify(badgeBytes, signature) !== true)
            throw new Error('could not verify signatures. the signature does not match the stored badge.');
        return Uint8Array.from(badgeBytes);
    };
}

export default BadgeSignature;
