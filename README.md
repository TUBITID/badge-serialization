# cryptbox 
Data encryption and signing library used by the [TubitID](https://github.com/TUBITID) to sign and encrypt badges. Aims to create the lowest size output with the given data and encryption/signature methods. Can encrypt(aes/3des) and box the data with a variable sized hmac signature(truncated) or a fixed size ECDSA signature. 

For symmetric key signatures, HMAC-SHA512 is used. For asymmetric(prrivate/public key) signatures, ECDSA with different curve options is used. The encryption can be done by either using AES or 3DES. Libraries used are meant to be cross-platform and this package is aimed to be used on react-native, web and node platforms.

This package can be used with any kind of arbitrary data, since it works with Buffers/Uint8Arrays. For TubitID, it is used to add protection and signature capabilities to our qr code badges.

## Libraries used
For signing, encryption and cross platform buffer support, below libraries are used.
- [feross/buffer](https://github.com/feross/buffer) cross browser buffer compatability
- [brix/crypto-js](https://github.com/brix/crypto-js) for HMAC signatures and AES/3DES encryptions
- [indutny/elliptic](https://github.com/indutny/elliptic) for ECDSA signatures

## Installattion
Run `npm install --save @tubitid/cryptbox` to install this package. 

### Usage
The package follows the es module exports convention.

```typescript
import { Cryptbox, EncryptionAlgorithm, ECDSACurve } from '@tubitid/cryptbox';

const cryptbox = Cryptbox.builder()
    // the created instance will use p192 curve with the given pub and priv keys
    // if the priv key isn't given, you can still use the cryptbox for verifying, but not for signing.
    .withECDSASignature(ECDSACurve.p192, 'base64 or uint8 arr pub key', 'optional priv key')
    // the instance will encrypt the data with AES/CBC and the given key.
    .withEncryption('encryption key as string', EncryptionAlgorithm.AES)
    // will use hmac, instead of ecdsa. this makes the withECDSASignature obsolote.
    // the second arguments tells the cryptbox to truncate the signature to 8 bytes.
    .withHMACSignature('hmac signature key', 8)
    // builds a cryptbox instance
    .build();
   
// Note: you don't have to use an encryption nor signature algorithm. both are optional.

async function example(){
    const data = Uint8Array.from([1, 2, 3]);
    // Our cryptbox instance has AES encryption and HMAC signature.
    // So our data will first be encrypted, the iv and salt will be added to the output.
    // Then the hmac signature will be calculated, truncated to 8 bytes, and prepended to the start of the resulting bytes
    // The resulting bytes of data will be encoded to base64.
    const resultBase64 = await cryptbox.protect(data);
    const resultBytes = await cryptbox.protectBinary(data);
    // first checks the signature of the data, if the signature algorithm is enabled
    // then decrypts the data if encryption is enabled
    await cryptbox.unprotect(resultBase64);
    await cryptbox.unprotectBinary(resultBytes);
}

example().then(console.log, console.log);
```
