import Cryptbox from '../src/Cryptbox';
import { ECDSACurve, EncryptionAlgorithm } from '../src';
import { randomBytes } from "./utils";
const Long = require('long');

describe('Cryptbox spec', () => {
    const cryptboxes = {
        'with-nothing':
            Cryptbox.builder()
                .build(),
        'with-hmac':
            Cryptbox.builder()
                .withHMACSignature('test-signature', 8)
                .build(),
        'with-ecdsa-secp256k1':
            Cryptbox.builder()
                .withECDSASignature(ECDSACurve.SECP256K1, 'BMGnGCIlCwgMrYaNV6+pmuPDbkKirlKMfi3qMH4V5q8X3c18EZfn7bSV8gt9t8m3fRZht0gB1vdd+bLAYvR/ZEM=', '5O/RP7I+KJi3G1Xq/zs79+aZXSP8x0oWR0K6fngiru8=')
                .build(),
        'with-hmac-and-aes':
            Cryptbox.builder()
                .withHMACSignature('test-signature', 8)
                .withEncryption('hello', EncryptionAlgorithm.AES)
                .build(),
        'with-ecdsa-p192-and-3des':
            Cryptbox.builder()
                .withECDSASignature(ECDSACurve.p192, 'BJqNJUck6GohkxQCXp0fz50umaViG9BSbmL7o8NlJfdboqYqeESaxCvfCaWwqmxSJg==', 'lKucBafgP8W2tWliZeaZEr7ckZrLdLuQ')
                .withEncryption('hello', EncryptionAlgorithm.TripleDES)
                .build(),
    };
    const keys = Object.keys(cryptboxes);
    const __TEST_DATA__ = [
        {
            data: Uint8Array.from([1, 2, 3]),
            boxed: {
                'with-nothing': 'AQID',
                'with-hmac': 'CKxR0xjnS3FZAQID',
                'with-ecdsa-secp256k1': 'QPiTapn5xzZIBQ7UvMD5I6RfmKbbQ2iuhoj28txIBpPtl44po8ob4/v0wjpnQfozu4tRCX14xtT2Aa0NrBjPEp8BAgM=',
            },
        },
        {
            data: Uint8Array.from([73, 42, 12, 56, 23, 11, 73, 79, 11, 22, 55, 241, 255, 0, 1, 0]),
            boxed: {
                'with-nothing': 'SSoMOBcLSU8LFjfx/wABAA==',
                'with-hmac': 'CECc03qpIEX7SSoMOBcLSU8LFjfx/wABAA==',
                'with-ecdsa-secp256k1': 'QFosZIWdrY/ytxHzB7JRYFQDn+hVe41LCgfayo3oluXRfMpak5tHAHm+e4TLRxzzXFpDAXsPnJTL6PM0gKg9UsJJKgw4FwtJTwsWN/H/AAEA',
            },
        }
    ];
    const __TEST_RANDOM_DATA__ = randomBytes(5).map(n => Uint8Array.from(randomBytes(n)));

    describe('boxing of binary data', () => {
        it('should protect binary data without problems', async () => {
            for(let key of keys){
                for(let testCase of __TEST_DATA__){
                    // we can't test against aes/des encryption with random iv/salt so we pass those we don't have test for.
                    if(!testCase.boxed[key]) continue;
                    const boxed = await cryptboxes[key].protect(testCase.data);

                    expect(boxed).toEqual(testCase.boxed[key]);
                }
            }
        });

        it('should unprotect into the same data', async () => {
            for(let key of keys){
                for(let data of __TEST_DATA__.map(x => x.data).concat(__TEST_RANDOM_DATA__)){
                    const cryptbox : Cryptbox = cryptboxes[key];
                    const boxed = await cryptbox.protect(data);
                    const unboxed = await cryptbox.unprotect(boxed);

                    expect(unboxed).toEqual(data);
                }
            }
        });
    });
});
