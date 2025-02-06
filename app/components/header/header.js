'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import { 
  HStack, 
  Box,
  Spacer
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import MinaWalletConnect from './minaWalletConnect';
import logo from './logo.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Box className={styles.description}>
      <Link href="/" className={styles.card}  rel="noopener noreferrer">            
        <HStack>
          {/* <Image src={logo} style={{height: '60px', width: '60px'}}/> */}
          <Box className={styles.creepsterRegular}>DE401K</Box>
        </HStack>
      </Link>
      <Spacer />
      <Box style={{fontSize: '15px'}}>
        <MinaWalletConnect />
      </Box>
    </Box>
  )
}
