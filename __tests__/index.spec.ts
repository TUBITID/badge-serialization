import { uint8ArrayToBase64String, base64StringToUint8Array } from '../src';
import { StudentMetaData, Department } from '@tubitid/badge-scheme';

describe('index spec', () => {
    const __TEST_DATA__ = {
        studentMeta: [
            { data: { no: 1152602008, department: Department.BTBS, grade: 3 }, base64: 'CJifzaUEEAEYAw==' },
        ]
    };

    function createStudentMeta(obj) : Uint8Array {
        return Uint8Array.from([...StudentMetaData.encode(StudentMetaData.fromObject(obj)).finish()]);
    }

    function verifyStudentMeta({ no, department, grade }, studentMeta : StudentMetaData) : void {
        expect(studentMeta.no).toEqual(no);
        expect(studentMeta.department).toEqual(department);
        expect(studentMeta.grade).toEqual(grade);
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
            'should create student metadata base64 correctly',
            createBase64Test(__TEST_DATA__.studentMeta, createStudentMeta)
        );
    });

    describe('reaed base64 string for models', () => {
        it(
            'should read student metadata base64 correctly',
            readBase64Test<StudentMetaData>(__TEST_DATA__.studentMeta, StudentMetaData.decode, verifyStudentMeta)
        );
    });
});
