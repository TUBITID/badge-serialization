import { Message } from 'google-protobuf';
import { Buffer } from 'buffer/';
import { SignedBadge as SB } from "../lib/models/tubitid-badge_pb";
const models = require('./models/tubitid-badge_pb');

export const Department = models.Department;
export const StudentMetadata = models.StudentMetaData;
export const FacebookMetaData = models.FacebookMetaData;
export const Badge = models.Badge;
export const SignedBadge = models.SignedBadge;
export * from './BadgeSignature';

export function createBase64String<T extends Message>(message: T) : string {
    return new Buffer(message.serializeBinary()).toString('base64');
}

export function createBase64Reader<T extends Message>(model: { deserializeBinary(bytes: Uint8Array): T; }) : (str: string) => T {
    return function(base64Str: string){
        return model.deserializeBinary(Uint8Array.from(Buffer.from(base64Str, 'base64')));
    };
}

export const readSignedBadgeBase64String : (str) => SB = createBase64Reader(models.SignedBadge);
