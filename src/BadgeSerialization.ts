import {base64StringToUint8Array, uint8ArrayToBase64String} from "./utils";
import {
    BadgeSignature, ECDSACurve, ECDSASignatureFactory, HMACSignatureFactory,
    SignatureFactory
} from "./BadgeSignature";
import { BadgeEncrypt, EncryptionAlgorithm } from "./BadgeEncrypt";

function uintArrOrBase64StrToBytes(bytes: Uint8Array | string) : Uint8Array {
    if(bytes instanceof Uint8Array)
        return bytes;
    if(typeof bytes === 'string')
        return base64StringToUint8Array(bytes);
    return Uint8Array.from(bytes);
}

export class BadgeSerializationBuilder{
    private ecdsaOptions? : { curve: ECDSACurve, pubKey: Uint8Array, privKey?: Uint8Array };
    private hmacOptions? : { key: string, signatureSize: number };
    private encryptionOptions? : { key: string, algorithm: EncryptionAlgorithm };

    constructor(){}

    /**
     * Initializes the BadgeSerialization with the given Encryption algorithm and the key.
     * So the outputted badges will be encrypted.
     * @param {string} key the key to use when doing the encryption
     * @param {EncryptionAlgorithm} algorithm the algorithm of the encryption.
     */
    withEncryption = (key: string, algorithm: EncryptionAlgorithm) : BadgeSerializationBuilder => {
        this.encryptionOptions = { key, algorithm };
        return this;
    };

    /**
     * Initializes the BadgeSerialization instance with ecdsa signature signing.
     * Only one of the hmac or ecdsa signature can be used.
     * @param {ECDSACurve} curve the curve to use
     * @param {Uint8Array | string} pubKey the public key for the curve either as bytes or base64
     * @param {Uint8Array | string} privKey the private key for the curve either as bytes or base64
     */
    withECDSASignature = (curve: ECDSACurve, pubKey: Uint8Array | string, privKey?: Uint8Array | string) : BadgeSerializationBuilder => {
        this.ecdsaOptions = {
            curve,
            pubKey: uintArrOrBase64StrToBytes(pubKey),
            privKey: uintArrOrBase64StrToBytes(privKey)
        };
        this.hmacOptions = null;

        return this;
    };

    /**
     * Initializes the BadgeSerialization instance with hmac signature signing.
     * Only one of the hmac or ecdsa signature can be used.
     * @param {string} key the key to use when doing the signing and verifying.
     * @param {number} signatureSize the size of the signature
     */
    withHMACSignature = (key: string, signatureSize: number = 64) : BadgeSerializationBuilder => {
        this.hmacOptions = { key, signatureSize };
        this.ecdsaOptions = null;

        return this;
    };

    /**
     * Builds and returns an instance of BadgeSerialization, with the given
     * @return {BadgeSerialization}
     */
    build = () : BadgeSerialization => {
        const signatureFactory : SignatureFactory
            = this.ecdsaOptions
                ? new ECDSASignatureFactory(this.ecdsaOptions.curve, this.ecdsaOptions.pubKey, this.ecdsaOptions.privKey)
                : this.hmacOptions ? new HMACSignatureFactory(this.hmacOptions.key) : null;
        const signature = signatureFactory ? new BadgeSignature(signatureFactory) : null;
        const encrypt
            = this.encryptionOptions
                ? new BadgeEncrypt(this.encryptionOptions.key, this.encryptionOptions.algorithm) : null;

        return new BadgeSerialization(
            encrypt,
            signature,
            this.hmacOptions ? this.hmacOptions.signatureSize : 64
        );
    };
}

export class BadgeSerialization {
    constructor(
        private readonly badgeEncryption?: BadgeEncrypt,
        private readonly badgeSignature?: BadgeSignature,
        // wanted size of the signature, only works for hmac signatures.
        private readonly wantedSignatureSize?: number,
    ){}

    /**
     * Given the badge bytes, applies necessary encryption and signature
     * operations to it, and returns a base64 encoded representation of the final data.
     * @param {Uint8Array} bytes the data to serialize
     * @param {number} signatureSize the signature size in bytes default is the one defined when creating serialization class.
     * only works for the hmac signatures.
     * @return {string} the base64 final data.
     */
    serialize = async (bytes: Uint8Array, signatureSize: number = this.wantedSignatureSize) : Promise<string> => {
        const result = await this.serializeBinary(bytes);

        return uint8ArrayToBase64String(result);
    };

    /**
     * Given the badge bytes, applies necessary encryption and signature
     * operation to it, and returns the final data in an array of bytes
     * @param {Uint8Array} bytes the data to serialize
     * @param {number} signatureSize the signature size in bytes default is the one defined when creating serialization class.
     * only works for the hmac signatures.
     * @return {Uint8Array} the resulting data
     */
    serializeBinary = async (bytes: Uint8Array, signatureSize: number = this.wantedSignatureSize) : Promise<Uint8Array> => {
        let result = bytes;

        if(this.badgeEncryption)
            result = await this.badgeEncryption.encrypt(result);
        if(this.badgeSignature)
            result = await this.badgeSignature.sign(result, signatureSize);

        return result;
    };

    /**
     * Given the badge bytes, applies the necessary encryption and signature operations reversed,
     * this means first checking the signature if there should be any, and then decrypting data, if decryption
     * is needed. The resulting bytes of data is the data cleaned from the signature and decrypted.
     * @param {Uint8Array} bytes the bytes of signed/encrypted data to process
     * @return {Promise<Uint8Array>} the resulting, cleaned bytes
     */
    deserializeBinary = async (bytes: Uint8Array) : Promise<Uint8Array> => {
        return this.decrypt(await this.verify(bytes));
    };

    /**
     * Only verifies the given data to see if its valid. If the instance has no hmac or ecdsa verifier
     * the data is considered as valid. And is returned without doing anything.
     * @param {Uint8Array} bytes
     * @return {Promise<Uint8Array>}
     */
    verify = async (bytes: Uint8Array) : Promise<Uint8Array> => {
        if(this.badgeSignature)
            return this.badgeSignature.verify(bytes);

        return bytes;
    };

    /**
     * Only decrypts the given data. The bytes of data is considered to be a valid encrypted data with iv, and salt.
     * if no encryptor is defined, returns the data itself without doing anything.
     * @param {Uint8Array} bytes
     * @return {Promise<Uint8Array>}
     */
    decrypt = async (bytes: Uint8Array) : Promise<Uint8Array> => {
        if(this.badgeEncryption)
            return this.badgeEncryption.decrypt(bytes);
        return bytes;
    };

    /**
     * Given the badge bytes as base64 string, applies the necessary encryption and signature operations reversed,
     * this means first checking the signature if there should be any, and then decrypting data, if decryption
     * is needed. The resulting bytes of data is the data cleaned from the signature and decrypted.
     * @param {string} base64Str the bytes of signed/encrypted data to process encoded in base64
     * @return {Promise<Uint8Array>} the resulting, cleaned bytes
     */
    deserialize = async (base64Str: string) : Promise<Uint8Array> => {
        return this.deserializeBinary(base64StringToUint8Array(base64Str));
    };

    static builder(){
        return new BadgeSerializationBuilder();
    }
}

export default BadgeSerialization;
