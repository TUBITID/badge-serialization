import { Buffer } from 'buffer/';
import { LibWordArray, lib } from "crypto-js";

export function wordArrayToUint8Array(wordArray: LibWordArray, bytes = -1) : Uint8Array {
    if(bytes == -1)
        bytes = wordArray.sigBytes;
    bytes = Math.min(bytes, wordArray.sigBytes);
    if(bytes <= 0)
        return Uint8Array.from([]);

    // Shortcuts
    const words = wordArray.words;
    const sigBytes = wordArray.sigBytes;
    const arr = new Uint8Array(bytes);

    for(let i = 0; i < bytes; i++) {
        arr[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    }

    return arr;
}

type CipherParamType = { ciphertext?: LibWordArray, salt?: LibWordArray, iv?: LibWordArray  };

export class BinaryFormatter{
    constructor(private readonly sizes: { salt: number, iv: number, block: number }){}

    stringify = (cipherParams : any) : Uint8Array => {
        const ciphertext = cipherParams.ciphertext;

        const salt = cipherParams.salt;
        const iv = cipherParams.iv;

        // @ts-ignore
        const arr : LibWordArray = salt.concat(iv).concat(ciphertext);
        return wordArrayToUint8Array(arr);
    };

    parse = (arr: Uint8Array) : any => {
        const params : CipherParamType = {};
        let offset = 0;

        if(this.sizes.salt > 0) {
            params.salt = lib.WordArray.create(arr.slice(offset, offset + this.sizes.salt));
            offset += this.sizes.salt;
        }

        if(this.sizes.iv > 0){
            params.iv = lib.WordArray.create(arr.slice(offset, offset + this.sizes.iv));
            offset += this.sizes.iv;
        }

        params.ciphertext = lib.WordArray.create(arr.slice(offset));

        // @ts-ignore
        return lib.CipherParams.create(params);
    };
}

export function uint8ArrayToBase64String(uint8Arr: Uint8Array) : string {
    return new Buffer(uint8Arr).toString('base64');
}

export function base64StringToUint8Array(base64Str: string){
    return Uint8Array.from(Buffer.from(base64Str, 'base64'));
}
