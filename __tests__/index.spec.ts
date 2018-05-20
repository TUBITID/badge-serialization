import { uint8ArrayToBase64String, base64StringToUint8Array } from '../src';
import { Badge } from '@tubitid/badge-scheme/lib/proto/badge';
const Long = require('long');

describe('index spec', () => {
    const __TEST_DATA__ = {
        badge: [
            { data: { id: 1152602008, name: "Yiğitcan UÇUM", expires: 15151515 }, base64: 'CJifzaUEEg9ZacSfaXRjYW4gVcOHVU0Ym+OcBw==' },
        ]
    };

    function createBadge(obj) : Uint8Array {
        return Uint8Array.from([...Badge.encode(Badge.fromObject(obj)).finish()]);
    }

    function verifyBadge({ id, name, expires }, badge : Badge) : void {
        expect(badge.id).toEqual(id);
        expect(badge.name).toEqual(name);

        if(badge.expires instanceof Long)
            expect((<Long>badge.expires).toNumber()).toEqual(expires);
        else
            expect(badge.expires).toEqual(expires);
    }

    function createBase64Test(dataArr: { data: object, base64: string }[], creator : (o: object) => Uint8Array){
        return function() {
            for (let testCase of dataArr) {
                const message = creator(testCase.data);
                expect(uint8ArrayToBase64String(message)).toEqual(testCase.base64);
            }
        };
    }

    function readBase64Test<T>(
        dataArr: { data: object, base64: string }[],
        reader: (s: Uint8Array) => T,
        verifier: (o: object, d: T) => void
    ){
        return function() {
            for (let testCase of dataArr) {
                const message = reader(base64StringToUint8Array(testCase.base64));
                verifier(testCase.data, message);
            }
        };
    }


    describe('create base64 strings for models', () => {
        it(
            'should create badge base64 correctly',
            createBase64Test(__TEST_DATA__.badge, createBadge)
        );
    });

    describe('read base64 string for models', () => {
        it(
            'should read badge base64 correctly',
            readBase64Test<Badge>(__TEST_DATA__.badge, Badge.decode, verifyBadge)
        );
    });
});
