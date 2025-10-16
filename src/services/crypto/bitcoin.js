import { ec as EC } from 'elliptic';
import hash from 'hash.js';
import bs58 from 'bs58';

const ec = new EC('secp256k1');

function toUint8Array(bytes) {
  return new Uint8Array(bytes);
}

function hexToUint8Array(hex) {
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }
  return new Uint8Array(bytes);
}

function concatUint8(a, b) {
  const c = new Uint8Array(a.length + b.length);
  c.set(a, 0);
  c.set(b, a.length);
  return c;
}

const generateBitcoinKeyPair = () => {
  const keyPair = ec.genKeyPair();
  const privateKey = keyPair.getPrivate('hex');
  const publicKeyCompressedHex = keyPair.getPublic(true, 'hex');

  const pubKeyBytes = hexToUint8Array(publicKeyCompressedHex);

  // SHA-256 of public key
  const sha = hash.sha256().update(pubKeyBytes).digest();
  const shaBytes = toUint8Array(sha);

  // RIPEMD-160 of the SHA-256
  const ripe = hash.ripemd160().update(shaBytes).digest();
  const ripeBytes = toUint8Array(ripe);

  // version byte (0x00) + ripe
  const versioned = concatUint8(new Uint8Array([0x00]), ripeBytes);

  // checksum = first 4 bytes of double SHA256
  const doubleSha = hash.sha256().update(hash.sha256().update(versioned).digest()).digest();
  const checksum = toUint8Array(doubleSha).slice(0, 4);

  const addressBytes = concatUint8(versioned, checksum);
  const address = bs58.encode(addressBytes);

  return { address, privateKey };
};

export { generateBitcoinKeyPair };