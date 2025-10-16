import React, { useState } from 'react';
import '../App.css';

const WalletView = ({ keys = { publicKey: '', privateKey: '' }, selectedChain = '' }) => {
  const [copied, setCopied] = useState({ public: false, private: false });

  const handleCopy = async (value, type) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied({ ...copied, [type]: true });
      setTimeout(() => {
        setCopied({ ...copied, [type]: false });
      }, 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const chainIcons = {
    ethereum: '⟠',
    solana: '◎',
    bitcoin: '₿'
  };

  return (
    <div className="w-full p-8 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all duration-300">
      <h2 className="text-2xl font-bold text-white mb-6">Wallet Information</h2>

      {!selectedChain ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-zinc-400 text-lg">Select a blockchain and generate keys</p>
          <p className="text-zinc-600 text-sm mt-2">Your wallet information will appear here</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-3 p-4 bg-black rounded-lg border border-zinc-800">
            <div className="text-3xl">{chainIcons[selectedChain] || '⬢'}</div>
            <div>
              <p className="text-xs text-zinc-500">Selected Network</p>
              <p className="text-xl font-semibold capitalize">{selectedChain}</p>
            </div>
          </div>

          {keys.publicKey && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 block">Public Key / Address</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-black border border-zinc-800 rounded-lg px-4 py-3 break-all text-sm text-zinc-300">
                    {keys.publicKey}
                  </div>
                  <button
                    onClick={() => handleCopy(keys.publicKey, 'public')}
                    className="px-4 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all duration-200 min-w-[80px]"
                  >
                    {copied.public ? '✓' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400 block">Private Key</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-black border border-zinc-800 rounded-lg px-4 py-3 break-all text-xs font-mono text-zinc-300">
                    {keys.privateKey}
                  </div>
                  <button
                    onClick={() => handleCopy(keys.privateKey, 'private')}
                    className="px-4 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all duration-200 min-w-[80px]"
                  >
                    {copied.private ? '✓' : 'Copy'}
                  </button>
                </div>
                <div className="flex items-start gap-2 p-3 bg-red-950/20 border border-red-900/30 rounded-lg">
                  <span className="text-red-500 text-sm">⚠</span>
                  <p className="text-xs text-red-400">
                    Keep your private key secure. Anyone with this key has full access to your wallet.
                  </p>
                </div>
              </div>
            </>
          )}

          {!keys.publicKey && selectedChain && (
            <div className="text-center py-8">
              <p className="text-zinc-500">Click "Generate" to create your wallet keys</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletView;