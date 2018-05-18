import { createBase64String, createBase64Reader, StudentMetadata, Department } from '../src';
import { Message } from 'google-protobuf';
import { StudentMetaData } from '@tubitid/badge-scheme/lib/proto/badge';

describe('index spec', () => {
    const __TEST_DATA__ = {
        studentMeta: [
            { data: { no: 1152602008, department: Department.BTBS, grade: 3 }, base64: 'CJifzaUEEAEYAw==' },
        ]
    };

    function createStudentMeta({ no, department, grade }) : StudentMetaData {
        const studentMeta = new StudentMetadata();
        studentMeta.setNo(no);
        studentMeta.setDepartment(department);
        studentMeta.setGrade(grade);

        return studentMeta;
    }

    function verifyStudentMeta({ no, department, grade }, studentMeta : StudentMetaData) : void {
        expect(studentMeta.getNo()).toEqual(no);
        expect(studentMeta.getDepartment()).toEqual(department);
        expect(studentMeta.getGrade()).toEqual(grade);
    }

    function createBase64Test<T extends Message>(dataArr: { data: object, base64: string }[], creator : (o: object) => T){
        return function() {
            for (let testCase of dataArr) {
                const message = creator(testCase.data);
                expect(createBase64String(message)).toEqual(testCase.base64);
            }
        };
    }

    function readBase64Test<T extends Message>(
        dataArr: { data: object, base64: string }[],
        reader: (s: string) => T,
        verifier: (o: object, d: T) => void
    ){
        return function() {
            for (let testCase of dataArr) {
                const message = reader(testCase.base64);
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
            readBase64Test(__TEST_DATA__.studentMeta, createBase64Reader(StudentMetaData), verifyStudentMeta)
        );
    });
});
