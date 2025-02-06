'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { WagmiConfig } from 'wagmi'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider, configureChains } from 'wagmi';
import { config } from "./wagmiConfig";
import Header from './components/header/header'
import '@rainbow-me/rainbowkit/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'var(--background)',
        color: 'var(--foreground)',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: '12px',
      },
      variants: {
        solid: {
          bg: 'var(--primary)',
          color: 'var(--foreground)',
          _hover: {
            bg: 'var(--secondary)',
          },
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: 'gray.50',
        },
      },
    },
  },
})

const queryClient = new QueryClient()
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <WagmiProvider config={config}> 
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider locale="en-US" coolMode
                    // showRecentTransactions={true}
                    theme={darkTheme({
                    accentColor: '#555555',
                    accentColorForeground: 'white',
                    })}>
                    <ChakraProvider theme={theme}>
                        <div className="tech-background"></div>
                        <Header />
                        {children}
                    </ChakraProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  )
}
