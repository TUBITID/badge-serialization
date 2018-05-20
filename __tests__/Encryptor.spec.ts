import { Encryptor, EncryptionAlgorithm, uint8ArrayToBase64String } from "../src";
import { randomBytes } from './utils';


describe('Badge Encrypt', () => {
    const badgeEncrypt = new Encryptor('test', EncryptionAlgorithm.TripleDES);
    const encryptors = {
        aes: new Encryptor('test', EncryptionAlgorithm.AES),
        des3: new Encryptor('test', EncryptionAlgorithm.TripleDES),
    };

    const __TEST_DATA__ = [
        /**
         * See the Triple DES algorithm appends maximum of 7 bytes to the data, where as AES adds 15.
         * That is why the choice of encryption algorithm may affect the size of the generated data.
         * The default encryption algorithm to use is AES because of its size and security.
         */
        { data: Uint8Array.from([1, 2, 3]), encryptedLengths: { aes: 40, des3: 24 } },
        { data: Uint8Array.from(randomBytes(7)), encryptedLengths: { aes: 40, des3: 24 } },
        { data: Uint8Array.from(randomBytes(8)), encryptedLengths: { aes: 40, des3: 32 } },
        { data: Uint8Array.from(randomBytes(15)), encryptedLengths: { aes: 40, des3: 32 } },
        { data: Uint8Array.from([...randomBytes(15), 0]), encryptedLengths: { aes: 56, des3: 40 } },
        { data: Uint8Array.from(randomBytes(16)), encryptedLengths: { aes: 56, des3: 40 } },
        { data: Uint8Array.from([...randomBytes(16), 0]), encryptedLengths: { aes: 56, des3: 40 } },
        { data: Uint8Array.from(randomBytes(24)), encryptedLengths: { aes: 56, des3: 48 } },
        { data: Uint8Array.from(randomBytes(32)), encryptedLengths: { aes: 72, des3: 56 } },
        { data: Uint8Array.from(randomBytes(40)), encryptedLengths: { aes: 72, des3: 64 } },
        // this is where we can fit into 37x37 qr code, with Q error check, and 8 bytes of signature
        { data: Uint8Array.from(randomBytes(47)), encryptedLengths: { aes: 72, des3: 64 } },
        { data: Uint8Array.from(randomBytes(128)), encryptedLengths: { aes: 168, des3: 152 } },
    ];

    describe('encryption and decryption of data', () => {
        it('should encrypt and decrypt uint8array without any problems', async () => {
            for(let testCase of __TEST_DATA__){
                for(let key of Object.keys(testCase.encryptedLengths)) {
                    const encrypted = await encryptors[key].encrypt(testCase.data);
                    const decrypted = await encryptors[key].decrypt(encrypted);

                    expect(encrypted.length).toEqual(testCase.encryptedLengths[key]);
                    expect(decrypted).toEqual(testCase.data);
                }
            }
        });
    });
});
