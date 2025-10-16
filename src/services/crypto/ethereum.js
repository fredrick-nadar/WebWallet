import { ethers } from 'ethers';

export const generateEthereumKeyPair = () => {
  const wallet = ethers.Wallet.createRandom();
  return {
    privateKey: wallet.privateKey,
    publicKey: wallet.address,
  };
};