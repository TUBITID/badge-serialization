const assert = require('assert');
const { Cryptbox, EncryptionAlgorithm, ECDSACurve } = require('../lib/index');

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
  const unprotected = await cryptbox.unprotect(resultBase64);
  const unprotected2 = await cryptbox.unprotectBinary(resultBytes);
  assert(data.toString() === unprotected.toString() && data.toString() === unprotected2.toString());
}

example().then(console.log, console.log);
