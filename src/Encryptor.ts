import { AES, Cipher, CipherOption, lib, mode, TripleDES } from 'crypto-js';
import { BinaryFormatter, wordArrayToUint8Array } from './utils';

export enum EncryptionAlgorithm {
    AES = 0,
    TripleDES = 1,
}

const options = {
    [EncryptionAlgorithm.TripleDES]: {
        algo: TripleDES,
        options: {},
        sizes: { salt: 8, iv: 8, block: 8 },
    },
    [EncryptionAlgorithm.AES]: {
        algo: AES,
        options: { mode: mode.CBC},
        sizes:  { salt: 8, iv: 16, block: 16 },
    },
};

export class Encryptor {
    private options: CipherOption;
    private algo: Cipher;
    private formatter: BinaryFormatter;

    /**
     * Creates and instance of data encryptor.
     * @param {string} encryptionKey the encryption key to use.
     * @param {EncryptionAlgorithm} encryptionAlgorithm the algorithm to use.
     */
    constructor(
        private readonly encryptionKey: string,
        private readonly encryptionAlgorithm: EncryptionAlgorithm = EncryptionAlgorithm.AES,
    ) {
        const o = options[encryptionAlgorithm];
        this.options = o.options;
        this.algo = o.algo;
        this.formatter = new BinaryFormatter(o.sizes);
    }

    /**
     * Encrypts the given Uint8Array with the instance's secret and returns an array
     * with salt, iv and the ciphertext concatenated together.
     * @param {Uint8Array} uint8Arr the bytes to encrypt
     * @return {Promise<string>}
     */
    public encrypt = async (uint8Arr: Uint8Array): Promise<Uint8Array> => {
        const wordArr = lib.WordArray.create(uint8Arr);

        return this.algo.encrypt(
            // @ts-ignore
            wordArr,
            this.encryptionKey,
            this.options,
        ).toString(this.formatter);
    }

    /**
     * Decrypts the given iv, salt and ciphertext pair and returns the decoded bytes.
     * @param {Uint8Array} uint8Arr the array that contains salt, iv and ciphertext.
     * @return {Promise<Uint8Array>}
     */
    public decrypt = async (uint8Arr: Uint8Array) => {
        const cipherParams = this.formatter.parse(uint8Arr);

        // @ts-ignore
        return wordArrayToUint8Array(this.algo.decrypt(cipherParams, this.encryptionKey, this.options));
    }
}

export default Encryptor;
