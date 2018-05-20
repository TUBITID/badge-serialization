import { Badge } from "@tubitid/badge-scheme/lib/proto/badge";
import BadgeSerialization from '../src/BadgeSerialization';
import { ECDSACurve, EncryptionAlgorithm } from '../src';
import { randomBytes } from "./utils";
const Long = require('long');

describe('BadgeSerialization spec', () => {
    const serializers = {
        'with-nothing':
            BadgeSerialization.builder()
                .build(),
        'with-hmac':
            BadgeSerialization.builder()
                .withHMACSignature('test-signature', 8)
                .build(),
        'with-ecdsa-secp256k1':
            BadgeSerialization.builder()
                .withECDSASignature(ECDSACurve.SECP256K1, 'BMGnGCIlCwgMrYaNV6+pmuPDbkKirlKMfi3qMH4V5q8X3c18EZfn7bSV8gt9t8m3fRZht0gB1vdd+bLAYvR/ZEM=', '5O/RP7I+KJi3G1Xq/zs79+aZXSP8x0oWR0K6fngiru8=')
                .build(),
        'with-hmac-and-aes':
            BadgeSerialization.builder()
                .withHMACSignature('test-signature', 8)
                .withEncryption('hello', EncryptionAlgorithm.AES)
                .build(),
        'with-ecdsa-p192-and-3des':
            BadgeSerialization.builder()
                .withECDSASignature(ECDSACurve.p192, 'BJqNJUck6GohkxQCXp0fz50umaViG9BSbmL7o8NlJfdboqYqeESaxCvfCaWwqmxSJg==', 'lKucBafgP8W2tWliZeaZEr7ckZrLdLuQ')
                .withEncryption('hello', EncryptionAlgorithm.TripleDES)
                .build(),
    };
    const keys = Object.keys(serializers);
    const __TEST_DATA__ = [
        {
            data: Uint8Array.from([1, 2, 3]),
            serialized: {
                'with-nothing': 'AQID',
                'with-hmac': 'CKxR0xjnS3FZAQID',
                'with-ecdsa-secp256k1': 'QPiTapn5xzZIBQ7UvMD5I6RfmKbbQ2iuhoj28txIBpPtl44po8ob4/v0wjpnQfozu4tRCX14xtT2Aa0NrBjPEp8BAgM=',
            },
        },
        {
            data: Uint8Array.from([73, 42, 12, 56, 23, 11, 73, 79, 11, 22, 55, 241, 255, 0, 1, 0]),
            serialized: {
                'with-nothing': 'SSoMOBcLSU8LFjfx/wABAA==',
                'with-hmac': 'CECc03qpIEX7SSoMOBcLSU8LFjfx/wABAA==',
                'with-ecdsa-secp256k1': 'QFosZIWdrY/ytxHzB7JRYFQDn+hVe41LCgfayo3oluXRfMpak5tHAHm+e4TLRxzzXFpDAXsPnJTL6PM0gKg9UsJJKgw4FwtJTwsWN/H/AAEA',
            },
        }
    ];
    const __TEST_RANDOM_DATA__ = randomBytes(5).map(n => Uint8Array.from(randomBytes(n)));

    describe('serializing of binary data', () => {
        it('should serialize binary data without problems', async () => {
            for(let key of keys){
                for(let testCase of __TEST_DATA__){
                    // we can't test against aes/des encryption with random iv/salt so we pass those we don't have test for.
                    if(!testCase.serialized[key]) continue;
                    const serialized = await serializers[key].serialize(testCase.data);

                    expect(serialized).toEqual(testCase.serialized[key]);
                }
            }
        });

        it('should deserialize into the same data', async () => {
            for(let key of keys){
                for(let data of __TEST_DATA__.map(x => x.data).concat(__TEST_RANDOM_DATA__)){
                    const serializer : BadgeSerialization = serializers[key];
                    const serialized = await serializer.serialize(data);
                    const deserialized = await serializer.deserialize(serialized);

                    expect(deserialized).toEqual(data);
                }
            }
        });
    });

    describe('serializing of proto schemes', () => {
        const __BADGE_DATA__ = [
            { data: { id: 1152602008, name: "Yiğitcan UÇUM" } },
            { data: { id: 1152602041, name: "ABDÜLKADİR MUZAFFER AMİKLİOĞLU", expires: Date.now() } },
        ];

        function verifyBadge({ id, name, expires } : { id: number, name: string, expires?: number }, badge){
            expect(badge.id).toEqual(id);
            expect(badge.name).toEqual(name);

            if(expires)
                expect(badge.expires instanceof Long ? badge.expires.toNumber() : badge.expires).toEqual(expires);
        }

        it('should serialize and deserialize badge data correctly with binary', async () => {
            for(let key of keys){
                for(let badgeCase of __BADGE_DATA__){
                    const badge = Badge.fromObject(badgeCase.data);
                    const binary = Badge.encode(badge).finish();
                    const serializer = serializers[key];
                    const serialized = await serializer.serializeBinary(binary);

                    const deserialized = await serializer.deserializeBinary(serialized);
                    const newBadge = Badge.decode(deserialized);

                    verifyBadge(badgeCase.data, newBadge);
                }
            }
        });

        it('should serialize and deserialize badge data correctly with base64', async () => {
            for(let key of keys){
                for(let badgeCase of __BADGE_DATA__){
                    const badge = Badge.fromObject(badgeCase.data);
                    const binary = Badge.encode(badge).finish();
                    const serializer = serializers[key];
                    const serialized = await serializer.serialize(binary);

                    const deserialized = await serializer.deserialize(serialized);
                    const newBadge = Badge.decode(deserialized);

                    verifyBadge(badgeCase.data, newBadge);
                }
            }
        });
    });
});
