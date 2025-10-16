import React, { useState } from 'react';
import '../App.css';


const ChainSelector = ({ onSelectChain }) => {
  const [selectedChain, setSelectedChain] = useState('');

  const chains = [
    { id: 'ethereum', name: 'Ethereum', icon: '⟠', color: 'from-blue-500/20 to-blue-600/20' },
    { id: 'solana', name: 'Solana', icon: '◎', color: 'from-purple-500/20 to-purple-600/20' },
    { id: 'bitcoin', name: 'Bitcoin', icon: '₿', color: 'from-orange-500/20 to-orange-600/20' }
  ];

  const handleChainSelect = (chainId) => {
    setSelectedChain(chainId);
    if (onSelectChain) onSelectChain(chainId);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <label className="block text-white text-lg font-medium mb-4 text-center">
        Choose Your Blockchain Network
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {chains.map((chain) => (
          <button
            key={chain.id}
            onClick={() => handleChainSelect(chain.id)}
            className={`
              relative p-6 rounded-2xl border-2 transition-all duration-300 transform
              ${selectedChain === chain.id 
                ? 'border-white bg-gradient-to-br ' + chain.color + ' scale-105' 
                : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:scale-102'
              }
            `}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="text-5xl">{chain.icon}</div>
              <div className="text-xl font-semibold text-white">{chain.name}</div>
              {selectedChain === chain.id && (
                <div className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedChain && (
        <p className="text-center text-zinc-500 text-sm mt-4">
          Selected: <span className="text-white font-medium capitalize">{selectedChain}</span>
        </p>
      )}
    </div>
  );
};

export default ChainSelector;