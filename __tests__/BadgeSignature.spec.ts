import { Buffer } from 'buffer/';
import BadgeSignature from '../src/BadgeSignature';

describe('BadgeSignature spec', () => {
    const __TEST_DATA__ = [
        { data: Uint8Array.from([1]), signed: Uint8Array.from([8, 141, 22, 41, 119, 219, 63, 121, 243, 1]) },
        { data: Uint8Array.from([1, 2, 3]), signed: Uint8Array.from([3, 172, 81, 211, 1, 2, 3]) },
        { data: Buffer.from([1, 2, 3]), signed: Uint8Array.from([3, 172, 81, 211, 1, 2, 3]) }
    ];
    const bSignature = new BadgeSignature('test-signature');

    describe('signature creation', () => {
        it('should sign data', async () => {
            for(let testCase of __TEST_DATA__){
                const signed = await bSignature.sign(testCase.data, testCase.signed[0]);
                expect(signed).toEqual(testCase.signed);
            }
        });

        it('should fail with invalid signature sizes', async () => {
            const arr = Uint8Array.from([]);

            expect(bSignature.sign(arr, -1)).rejects.toBeDefined();
            expect(bSignature.sign(arr, 0)).rejects.toBeDefined();
            expect(bSignature.sign(arr, 65)).rejects.toBeDefined();
        });
    });

    describe('verification of signatures', () => {
        it('should verify signatures', async () => {
            for(let testCase of __TEST_DATA__){
                const data = await bSignature.verify(testCase.signed);
                expect(data).toEqual(Uint8Array.from(testCase.data));
            }
        });

        it('should fail with invalid signatures', () => {
            expect(bSignature.verify(Uint8Array.from([1]))).rejects.toBeDefined();
            expect(bSignature.verify(Uint8Array.from([0]))).rejects.toBeDefined();
        });

        it('should accept zero length signatures', () => {
            expect(bSignature.verify(Uint8Array.from([0, 1]))).resolves.toEqual(Uint8Array.from([1]));
        });
    });
});
