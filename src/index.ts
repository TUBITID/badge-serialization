import { Buffer } from 'buffer/';

export * from './BadgeSignature';

export function uint8ArrayToBase64String(uint8Arr: Uint8Array) : string {
    return new Buffer(uint8Arr).toString('base64');
}

export function base64StringToUint8Array(base64Str: string){
    return Uint8Array.from(Buffer.from(base64Str, 'base64'));
}
