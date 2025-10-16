import React, { useState } from 'react';

const KeyGenerator = ({ selectedChain, keys, onGenerate }) => {
  const [copied, setCopied] = useState({ public: false, private: false });

  const handleGenerate = () => {
    if (selectedChain) {
      onGenerate(selectedChain);
    }
  };

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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Key Generator</h2>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
      </div>

      {selectedChain && (
        <div className="flex items-center gap-3 p-4 bg-black rounded-lg border border-zinc-800 mb-6">
          <div className="text-3xl">{chainIcons[selectedChain] || '⬢'}</div>
          <div className="flex-1">
            <p className="text-xs text-zinc-500">Generating keys for</p>
            <p className="text-xl font-semibold capitalize">{selectedChain}</p>
          </div>
          <button
            onClick={handleGenerate}
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Generate Wallet
          </button>
        </div>
      )}

      {!selectedChain && (
        <div className="text-center py-8 mb-6">
          <p className="text-zinc-500">Select a blockchain network above to get started</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="group">
          <label className="text-sm font-medium text-zinc-400 mb-2 block">Public Key / Address</label>
          <div className="flex gap-2">
            <input
              readOnly
              value={keys.publicKey}
              placeholder={selectedChain ? "Click 'Generate Wallet' to create keys" : "Select a chain first"}
              className="flex-1 bg-black text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors duration-200 text-sm"
            />
            <button
              onClick={() => handleCopy(keys.publicKey, 'public')}
              disabled={!keys.publicKey}
              className="px-4 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-w-[80px]"
            >
              {copied.public ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="group">
          <label className="text-sm font-medium text-zinc-400 mb-2 block">Private Key</label>
          <div className="flex gap-2">
            <input
              readOnly
              type="password"
              value={keys.privateKey}
              placeholder={selectedChain ? "Click 'Generate Wallet' to create keys" : "Select a chain first"}
              className="flex-1 bg-black text-white border border-zinc-700 rounded-lg px-4 py-3 font-mono text-xs focus:outline-none focus:border-white transition-colors duration-200"
            />
            <button
              onClick={() => handleCopy(keys.privateKey, 'private')}
              disabled={!keys.privateKey}
              className="px-4 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-w-[80px]"
            >
              {copied.private ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          {keys.privateKey && (
            <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
              <span>⚠</span> Never share your private key with anyone
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeyGenerator;