import { Keypair } from '@solana/web3.js';

export const generateSolanaKeypair = () => {
  const keypair = Keypair.generate();
  return {
    publicKey: keypair.publicKey.toString(),
    privateKey: Buffer.from(keypair.secretKey).toString('hex'),
  };
};