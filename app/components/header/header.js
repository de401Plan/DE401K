'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import { 
  HStack, 
  Box,
  Spacer,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import MinaWalletConnect from './minaWalletConnect';
import logo from './de401k.jpg'
import navItems from './navItems.json';


export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  // const activeBg = useColorModeValue('blue.500', 'blue.200');
  // const inactiveBg = 'transparent';
  // const activeColor = useColorModeValue('white', 'gray.800');
  // const inactiveColor = useColorModeValue('white.600', 'white.300');
  // const hoverBg = useColorModeValue('blue.300', 'blue.700');
  // const isActive = (path) => pathname === path;

  return (
    <Box className={styles.description}>
      <Link href="/" className={styles.card}  rel="noopener noreferrer">            
        <HStack>
          <Image src={logo} style={{height: '40px', width: '40px', borderRadius: '50%'}}/>
          <Box className={styles.creepsterRegular}>DE401K</Box>
        </HStack>
      </Link>
      {/* <HStack spacing={4} flex={1} justify="center" mx={8}>
        {navItems.map((item) => (
          <Button
            key={item.path}
            onClick={() => router.push(item.path)}
            bg={isActive(item.path) ? activeBg : inactiveBg}
            color={isActive(item.path) ? activeColor : inactiveColor}
            _hover={{
              bg: isActive(item.path) ? activeBg : hoverBg,
              color: isActive(item.path) ? activeColor : inactiveColor,
            }}
            variant="ghost"
            size="md"
            px={6}
            fontWeight={isActive(item.path) ? "bold" : "normal"}
            borderRadius="full"
          >
            {item.name}
          </Button>
        ))}
      </HStack> */}
      <Box style={{fontSize: '15px'}}>
        <MinaWalletConnect />
      </Box>
    </Box>
  )
}
