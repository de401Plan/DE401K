'use client';

import { createContext, useContext, useState } from 'react';

// 创建 Context
const WalletContext = createContext({
  walletAddress: '',
  setWalletAddress: () => {},
  isConnected: false,
  setIsConnected: () => {},
});

// 创建 Provider 组件
export function WalletProvider({ children }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const value = {
    walletAddress,
    setWalletAddress,
    isConnected,
    setIsConnected,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

// 创建自定义 Hook
export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}