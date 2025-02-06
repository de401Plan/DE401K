'use client';

import { Button, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Field } from 'o1js';

const getEllipsisTxt = (address) => {
  if (!address) return "";
  const firstSix = address.slice(0, 6);
  const lastSix = address.slice(-6);
  return `${firstSix}...${lastSix}`;
};


const ZKAPP_ADDRESS = 'B62qpXPvmKDf4SaFJynPsT6DyvuxMS9H1pT4TGonDT26m599m7dS9gP';
export default function MinaWalletConnect() {
    const [address, setAddress] = useState('')
    const [hasWallet, setHasWallet] = useState(null);
    const [hasBeenSetup, setHasBeenSetup] = useState(false);
    const [accountExists, setAccountExists] = useState(false);
    const [publicKeyBase58, setPublicKeyBase58] = useState('');
    const [creatingTransaction, setCreatingTransaction] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [transactionlink, setTransactionLink] = useState('');

    useEffect(() => {
        // const setup = async () => {
            
        //   };
      
        //   setup();
    }, []);

    const connectWallet = async () => {
        try {
            const mina = (window).mina;
            if (mina == null) {
            setHasWallet(false);
            console.log('Wallet not found.');
            return;
            }

            const publicKeyBase58 = (await mina.requestAccounts())[0];
            setPublicKeyBase58(publicKeyBase58);
            console.log(`Using key:${publicKeyBase58}`);
          } catch (error) {
            console.log(`Error during setup: ${error.message}`);
          }
    }

    const disconnectWallet = async () => {
        try {
            const mina = window.mina;
            if (mina && publicKeyBase58) {
                // 调用钱包的断开连接方法（如果有）
                if (mina.disconnect) await mina.disconnect();
                
                // 重置所有相关状态
                setPublicKeyBase58('');
                setAddress('');
                setAccountExists(false);
                setTransactionLink('');
                console.log('Wallet disconnected');
            }
        } catch (error) {
            console.log(`Error disconnecting: ${error.message}`);
        }
    }

    return (
        <div>      
            <div style={{fontSize: '15px'}}>
                {
                    publicKeyBase58 != '' ?
                        <Tooltip label={publicKeyBase58}>
                            <Button colorScheme='telegram' variant='outline' onClick={() => disconnectWallet()}>{getEllipsisTxt(publicKeyBase58)}</Button>
                        </Tooltip>
                        :
                        <Button colorScheme='telegram' variant='solid' onClick={() => connectWallet()}>Connect Wallet</Button>
                }
                
            </div>
        </div>
    )
}
