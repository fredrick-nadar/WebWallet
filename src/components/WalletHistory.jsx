import React, { useState } from 'react';

const WalletHistory = ({ wallets, onLoadWallet, onDeleteWallet, onClearAll }) => {
  const [copied, setCopied] = useState({});

  const handleCopy = async (value, walletId, type) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied({ ...copied, [`${walletId}-${type}`]: true });
      setTimeout(() => {
        setCopied({ ...copied, [`${walletId}-${type}`]: false });
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

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateKey = (key, start = 8, end = 6) => {
    if (!key || key.length <= start + end) return key;
    return `${key.substring(0, start)}...${key.substring(key.length - end)}`;
  };

  return (
    <div className="w-full p-8 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Wallet History</h2>
          <p className="text-sm text-zinc-500 mt-1">{wallets.length} wallet{wallets.length !== 1 ? 's' : ''} saved</p>
        </div>
        {wallets.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-4 py-2 text-sm bg-red-950/30 text-red-400 border border-red-900/30 rounded-lg hover:bg-red-950/50 transition-colors duration-200"
          >
            Clear All
          </button>
        )}
      </div>

      {wallets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-zinc-400 text-lg">No wallets created yet</p>
          <p className="text-zinc-600 text-sm mt-2">Generate your first wallet to see it here</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className="p-4 bg-black border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{chainIcons[wallet.chain] || '⬢'}</div>
                  <div>
                    <p className="text-white font-semibold capitalize">{wallet.chain}</p>
                    <p className="text-xs text-zinc-500">{formatDate(wallet.createdAt)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onDeleteWallet(wallet.id)}
                    className="px-3 py-1 text-xs bg-red-950/30 text-red-400 border border-red-900/30 rounded hover:bg-red-950/50 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Public Key</label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs text-zinc-400 font-mono bg-zinc-900 px-2 py-1 rounded">
                      {truncateKey(wallet.publicKey, 12, 8)}
                    </code>
                    <button
                      onClick={() => handleCopy(wallet.publicKey, wallet.id, 'public')}
                      className="px-2 py-1 text-xs bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors duration-200 min-w-[60px]"
                    >
                      {copied[`${wallet.id}-public`] ? '✓' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Private Key</label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs text-zinc-400 font-mono bg-zinc-900 px-2 py-1 rounded">
                      {truncateKey(wallet.privateKey, 12, 8)}
                    </code>
                    <button
                      onClick={() => handleCopy(wallet.privateKey, wallet.id, 'private')}
                      className="px-2 py-1 text-xs bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors duration-200 min-w-[60px]"
                    >
                      {copied[`${wallet.id}-private`] ? '✓' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WalletHistory;
