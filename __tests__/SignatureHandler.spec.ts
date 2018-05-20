import { Buffer } from 'buffer/';
import SignatureHandler from '../src/SignatureHandler';
import { ECDSACurve, ECDSASignatureFactory, HMACSignatureFactory } from "../src";

describe('SignatureHandler spec', () => {
    const keys = {
        ed25519: {
            priv: new Buffer('DP5SS20yLZD6buZHX3VH4R6EXEcoNiFTQAvC8xdrfBQ=', 'base64'),
            pub: new Buffer('BB7pV5ZPhJINorG3X3KRaZcDesYEgWtLHakUTMa9j7ryPJaAlK1dQeHPUDUZ0AQsJW0B1iCufJyVqnYlGP7nMs0=', 'base64'),
        },
        p192: {
            priv: new Buffer('lKucBafgP8W2tWliZeaZEr7ckZrLdLuQ', 'base64'),
            pub: new Buffer('BJqNJUck6GohkxQCXp0fz50umaViG9BSbmL7o8NlJfdboqYqeESaxCvfCaWwqmxSJg==', 'base64'),
        },
        secp256k1: {
            priv: new Buffer('5O/RP7I+KJi3G1Xq/zs79+aZXSP8x0oWR0K6fngiru8=', 'base64'),
            pub: new Buffer('BMGnGCIlCwgMrYaNV6+pmuPDbkKirlKMfi3qMH4V5q8X3c18EZfn7bSV8gt9t8m3fRZht0gB1vdd+bLAYvR/ZEM=', 'base64')
        }
    };

    const ecdsaSignatureFactory = new ECDSASignatureFactory(ECDSACurve.ed25519, keys.ed25519.pub, keys.ed25519.priv);
    const ecdsaSignature = new SignatureHandler(ecdsaSignatureFactory);
    const ecdsap192SignatureFactory = new ECDSASignatureFactory(ECDSACurve.p192, keys.p192.pub, keys.p192.priv);
    const ecdsap192Signature = new SignatureHandler(ecdsap192SignatureFactory);
    const ecdsaSecp256k1SignatureFactory = new ECDSASignatureFactory(ECDSACurve.SECP256K1, keys.secp256k1.pub, keys.secp256k1.priv);
    const ecdsaSecp256k1Signature = new SignatureHandler(ecdsaSecp256k1SignatureFactory);
    const hmacSignatureFactory = new HMACSignatureFactory('test-signature');
    const hmacSignature = new SignatureHandler(hmacSignatureFactory);

    const __TEST_DATA__ = {
        hmac: {
            signature: hmacSignature,
            tests:[
                { data: Uint8Array.from([1]), signed: Uint8Array.from([8, 141, 22, 41, 119, 219, 63, 121, 243, 1]) },
                { data: Uint8Array.from([1, 2, 3]), signed: Uint8Array.from([3, 172, 81, 211, 1, 2, 3]) },
                { data: Buffer.from([1, 2, 3]), signed: Uint8Array.from([3, 172, 81, 211, 1, 2, 3]) }
            ]
        },
        ecdsa: {
            [ECDSACurve.ed25519]: {
                signature: ecdsaSignature,
                tests: [
                    { data: Uint8Array.from([1, 2, 3]), signed: Uint8Array.from(new Buffer('QAIJExcCZQcnwH5OJxtDqHOID3YQ9mEnoNEz89iJGrh/DRflzfu8yL2TrsGo17zDLjb9/dmdGjyAqPIktOEOQy8BAgM=', 'base64')) },
                    { data: Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]), signed: Uint8Array.from(new Buffer('QAvzyR1W78PLWSqz0S2FOyXvW2W3/ICHvnoK9BR2bSyoALtWfHidWkPdgQJbIM9y8maKPLv8oMJ25Dlue6Ijto0BAgMEBQYHCAkKCwwNDg8QERITFA==', 'base64')) }
                ]
            },
            [ECDSACurve.p192]: {
                signature: ecdsap192Signature,
                tests: [
                    { data: Uint8Array.from([1, 2, 3]), signed: Uint8Array.from(new Buffer('MIbzMtKeQkPvTn1mT5EiC6YgFEXRzmmJeqX6nJsW0r2vuONhA100RGua6zzvl+3FYwECAw==', 'base64')) },
                    { data: Uint8Array.from([127, 207, 179, 168, 100, 125, 165, 204, 180, 178, 213, 36, 213, 69, 34, 50, 215, 32, 193, 151]), signed: Uint8Array.from(new Buffer('MOh9eBqKS9qdGbgETFssdxmFaTAVWJeqhApmTzi7XDmVH+ZtEWPN+r/ksbqNdi8YQH/Ps6hkfaXMtLLVJNVFIjLXIMGX', 'base64')) }
                ]
            },
            [ECDSACurve.SECP256K1]: {
                signature: ecdsaSecp256k1Signature,
                tests: [
                    { data: Uint8Array.from([1, 2, 3]), signed: Uint8Array.from(new Buffer('QPiTapn5xzZIBQ7UvMD5I6RfmKbbQ2iuhoj28txIBpPtl44po8ob4/v0wjpnQfozu4tRCX14xtT2Aa0NrBjPEp8BAgM=', 'base64')) },
                    { data: Uint8Array.from([60, 35, 49, 135, 104, 231, 76, 107, 178, 4, 21, 36, 252, 99, 78, 180, 15, 161, 129, 93]), signed: Uint8Array.from(new Buffer('QMFkGAlJK0yZIOVpnKuM826GcgcTCvGDw92BYmMp+oL74QIffYV+k7zj7aTpE3qfIosHC9DxoHECUDESk/26e4Q8IzGHaOdMa7IEFST8Y060D6GBXQ==', 'base64')) },
                ]
            },
        }
    };
    // @ts-ignore
    const __TEST_DATA_MAPPED__ = [__TEST_DATA__.hmac, ...Object.values(__TEST_DATA__.ecdsa)];

    describe('signature creation', () => {
        it('should sign data', async () => {
            for(let testGroup of __TEST_DATA_MAPPED__) {
                for (let testCase of testGroup.tests) {
                    const signed = await testGroup.signature.sign(testCase.data, testCase.signed[0]);

                    expect(signed).toEqual(testCase.signed);
                }
            }
        });

        it('hmac should fail with invalid signature sizes', async () => {
            const arr = Uint8Array.from([]);

            expect(hmacSignature.sign(arr, -1)).rejects.toBeDefined();
            expect(hmacSignature.sign(arr, 0)).rejects.toBeDefined();
            expect(hmacSignature.sign(arr, 65)).rejects.toBeDefined();
        });

        it('hmac should truncate signatures properly', async () => {
            const arr = Uint8Array.from([1]);

            for (let i = 1; i < 65; i++) {
                expect((await hmacSignature.sign(arr, i))[0]).toEqual(i);
            }
        });

        it('ecdsa should ignore signature size', async () => {
            const arr = Uint8Array.from([1, 2, 3]);
            const signatureSize = 48;

            for (let i = 1; i < 64; i++) {
                expect((await ecdsap192Signature.sign(arr, i))[0]).toEqual(signatureSize);
            }
        });
    });

    describe('verification of signatures', () => {
        it('should verify signatures', async () => {
            for(let testGroup of __TEST_DATA_MAPPED__) {
                for (let testCase of testGroup.tests) {
                    const data = await testGroup.signature.verify(testCase.signed);
                    expect(data).toEqual(Uint8Array.from(testCase.data));
                }
            }
        });

        it('hmac should fail with invalid signatures', async () => {
            expect(hmacSignature.verify(Uint8Array.from([1]))).rejects.toBeDefined();
            expect(hmacSignature.verify(Uint8Array.from([0]))).rejects.toBeDefined();
        });
    });
});
