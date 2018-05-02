// package: tubitid.badge
// file: tubitid-badge.proto

import * as jspb from "google-protobuf";

export class StudentMetaData extends jspb.Message {
  getNo(): number;
  setNo(value: number): void;

  getDepartment(): Department;
  setDepartment(value: Department): void;

  getGrade(): number;
  setGrade(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StudentMetaData.AsObject;
  static toObject(includeInstance: boolean, msg: StudentMetaData): StudentMetaData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StudentMetaData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StudentMetaData;
  static deserializeBinaryFromReader(message: StudentMetaData, reader: jspb.BinaryReader): StudentMetaData;
}

export namespace StudentMetaData {
  export type AsObject = {
    no: number,
    department: Department,
    grade: number,
  }
}

export class FacebookMetaData extends jspb.Message {
  getFacebookid(): string;
  setFacebookid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FacebookMetaData.AsObject;
  static toObject(includeInstance: boolean, msg: FacebookMetaData): FacebookMetaData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FacebookMetaData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FacebookMetaData;
  static deserializeBinaryFromReader(message: FacebookMetaData, reader: jspb.BinaryReader): FacebookMetaData;
}

export namespace FacebookMetaData {
  export type AsObject = {
    facebookid: string,
  }
}

export class Badge extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getExpires(): number;
  setExpires(value: number): void;

  hasStudent(): boolean;
  clearStudent(): void;
  getStudent(): StudentMetaData | undefined;
  setStudent(value?: StudentMetaData): void;

  hasFacebook(): boolean;
  clearFacebook(): void;
  getFacebook(): FacebookMetaData | undefined;
  setFacebook(value?: FacebookMetaData): void;

  getMetadataCase(): Badge.MetadataCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Badge.AsObject;
  static toObject(includeInstance: boolean, msg: Badge): Badge.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Badge, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Badge;
  static deserializeBinaryFromReader(message: Badge, reader: jspb.BinaryReader): Badge;
}

export namespace Badge {
  export type AsObject = {
    id: number,
    name: string,
    expires: number,
    student?: StudentMetaData.AsObject,
    facebook?: FacebookMetaData.AsObject,
  }

  export enum MetadataCase {
    METADATA_NOT_SET = 0,
    STUDENT = 4,
    FACEBOOK = 5,
  }
}

export class SignedBadge extends jspb.Message {
  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  hasBadge(): boolean;
  clearBadge(): void;
  getBadge(): Badge | undefined;
  setBadge(value?: Badge): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignedBadge.AsObject;
  static toObject(includeInstance: boolean, msg: SignedBadge): SignedBadge.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignedBadge, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignedBadge;
  static deserializeBinaryFromReader(message: SignedBadge, reader: jspb.BinaryReader): SignedBadge;
}

export namespace SignedBadge {
  export type AsObject = {
    signature: Uint8Array | string,
    badge?: Badge.AsObject,
  }
}

export enum Department {
  NONE = 0,
  BTBS = 1,
  IBY = 2,
  GIB = 3,
  UT = 4,
  BSB = 5,
}

