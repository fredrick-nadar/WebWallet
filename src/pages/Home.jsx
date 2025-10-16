import React from 'react';
import KeyGenerator from '../components/KeyGenerator';
import WalletHistory from '../components/WalletHistory';
import ChainSelector from '../components/ChainSelector';
import useWallet from '../hooks/useWallet';

const Home = () => {
  const { 
    selectedChain, 
    setSelectedChain, 
    keys, 
    generateKeys, 
    walletHistory, 
    deleteWallet, 
    clearAllWallets,
    loadWallet 
  } = useWallet();

  const scrollToWallet = () => {
    document.getElementById('wallet-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Landing Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            Blockchain
            <span className="block text-white/80">Wallet</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto">
            Generate secure multi-chain wallets for Ethereum, Solana, and Bitcoin.
            <span className="block mt-2 text-lg text-white/40">Pure client-side. Your keys, your control.</span>
          </p>

          <button 
            onClick={scrollToWallet}
            className="group px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Wallet Generation Section */}
      <section id="wallet-section" className="min-h-screen py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Create Your Wallet</h2>
              <p className="text-white/60 text-lg">Select a blockchain and generate your keys instantly</p>
            </div>

            {/* Chain Selector Cards */}
            <div className="mb-12 animate-slide-up-delay-1">
              <ChainSelector onSelectChain={(c) => setSelectedChain(c)} />
            </div>

            {/* Main Grid: Generator and History */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up-delay-2">
              {/* Key Generator */}
              <div>
                <KeyGenerator 
                  selectedChain={selectedChain}
                  keys={keys}
                  onGenerate={generateKeys}
                />
              </div>

              {/* Wallet History */}
              <div>
                <WalletHistory
                  wallets={walletHistory}
                  onLoadWallet={loadWallet}
                  onDeleteWallet={deleteWallet}
                  onClearAll={clearAllWallets}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
