import { LibWordArray } from "crypto-js";

export function wordArrayToUint8Array(wordArray: LibWordArray, bytes = 0){
    // Shortcuts
    const words = wordArray.words;
    const sigBytes = wordArray.sigBytes;
    const arr = new Uint8Array(Math.min(sigBytes, bytes));
    if(arr.length <= 0)
        return arr;

    for(let i = 0; i < sigBytes; i++) {
        const bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        arr[i] = bite;
    }

    return arr;
}
