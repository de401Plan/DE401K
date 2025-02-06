'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Header from './components/header/header'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import { WalletProvider } from './context/WalletContext'

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <WalletProvider>
            <ChakraProvider theme={theme}>
                <div className="tech-background"></div>
                <Header />
                {children}
            </ChakraProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
