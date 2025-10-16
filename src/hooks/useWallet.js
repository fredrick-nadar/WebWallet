import { useState, useEffect } from 'react';
import { generateEthereumKeyPair } from '../services/crypto/ethereum';
import { generateSolanaKeypair } from '../services/crypto/solana';
import { generateBitcoinKeyPair } from '../services/crypto/bitcoin';

const STORAGE_KEY = 'blockchain_wallet_history';

const useWallet = () => {
  const [selectedChain, setSelectedChain] = useState('');
  const [keys, setKeys] = useState({ publicKey: '', privateKey: '' });
  const [walletHistory, setWalletHistory] = useState([]);

  // Load wallet history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setWalletHistory(parsed);
      }
    } catch (err) {
      console.error('Failed to load wallet history:', err);
    }
  }, []);

  // Save wallet history to localStorage whenever it changes
  useEffect(() => {
    try {
      if (walletHistory.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(walletHistory));
      }
    } catch (err) {
      console.error('Failed to save wallet history:', err);
    }
  }, [walletHistory]);

  const generateKeys = (chain = selectedChain) => {
    let newKeys = { publicKey: '', privateKey: '' };
    try {
      switch ((chain || '').toLowerCase()) {
        case 'ethereum':
          newKeys = generateEthereumKeyPair();
          newKeys = { publicKey: newKeys.publicKey || newKeys.address, privateKey: newKeys.privateKey };
          break;
        case 'solana':
          newKeys = generateSolanaKeypair();
          newKeys = { publicKey: newKeys.publicKey, privateKey: newKeys.privateKey };
          break;
        case 'bitcoin':
          newKeys = generateBitcoinKeyPair();
          newKeys = { publicKey: newKeys.address, privateKey: newKeys.privateKey };
          break;
        default:
          newKeys = { publicKey: '', privateKey: '' };
      }

      // Add to wallet history
      if (newKeys.publicKey && newKeys.privateKey) {
        const walletEntry = {
          id: Date.now() + Math.random().toString(36).substr(2, 9),
          chain: chain || selectedChain,
          publicKey: newKeys.publicKey,
          privateKey: newKeys.privateKey,
          createdAt: new Date().toISOString(),
        };
        setWalletHistory(prev => [walletEntry, ...prev]);
      }

      setKeys(newKeys);
      return newKeys;
    } catch (err) {
      console.error('Key generation failed:', err);
      setKeys({ publicKey: '', privateKey: '' });
      return { publicKey: '', privateKey: '' };
    }
  };

  const deleteWallet = (walletId) => {
    setWalletHistory(prev => prev.filter(w => w.id !== walletId));
  };

  const clearAllWallets = () => {
    if (confirm('Are you sure you want to delete all wallets? This cannot be undone.')) {
      setWalletHistory([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const loadWallet = (wallet) => {
    setSelectedChain(wallet.chain);
    setKeys({ publicKey: wallet.publicKey, privateKey: wallet.privateKey });
  };

  return {
    selectedChain,
    setSelectedChain,
    keys,
    generateKeys,
    walletHistory,
    deleteWallet,
    clearAllWallets,
    loadWallet,
  };
};

export default useWallet;