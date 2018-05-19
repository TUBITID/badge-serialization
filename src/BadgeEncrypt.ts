import { AES, TripleDES, lib, mode, CipherOption, Cipher } from 'crypto-js';
import { BinaryFormatter, wordArrayToUint8Array } from './utils';

export enum EncryptionAlgorithm{
    AES = 0,
    TripleDES = 1,
}
//const options = { padding: pad.ZeroPadding, mode: mode.CBC };
const options = {
    [EncryptionAlgorithm.TripleDES]: {
        algo: TripleDES,
        options: {},
        sizes: { salt: 8, iv: 8, block: 8 }
    },
    [EncryptionAlgorithm.AES]: {
        algo: AES,
        options: { mode: mode.CBC},
        sizes:  { salt: 8, iv: 16, block: 16 },
    },
};

export class BadgeEncrypt {
    private options: CipherOption;
    private algo: Cipher;
    private formatter : BinaryFormatter;

    constructor(
        private readonly encryptionKey: string,
        private readonly encryptionAlgorithm: EncryptionAlgorithm = EncryptionAlgorithm.AES,
    ){
        const o = options[encryptionAlgorithm];
        this.options = o.options;
        this.algo = o.algo;
        this.formatter = new BinaryFormatter(o.sizes);
    }

    encrypt = async (uint8Arr: Uint8Array) => {
        const wordArr = lib.WordArray.create(uint8Arr);

        return this.algo.encrypt(
            // @ts-ignore
            wordArr,
            this.encryptionKey,
            this.options
        ).toString(this.formatter);
    };

    decrypt = async (uint8Arr: Uint8Array) => {
        const cipherParams = this.formatter.parse(uint8Arr);

        // @ts-ignore
        return wordArrayToUint8Array(this.algo.decrypt(cipherParams, this.encryptionKey, this.options));
    };
}

export default BadgeEncrypt;
