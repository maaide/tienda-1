import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { SWRConfig } from 'swr'
import { MainLayout } from '../components/layouts'
import CartProvider from '../context/cart/CartProvider'
import { Chat } from '../components/chat'
import DesignProvider from '../context/design/DesignProvider'
import LogoProvider from '@/context/logo/LogoProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <ThemeProvider attribute='class'>
        <DesignProvider>
          <LogoProvider>
            <CartProvider>
              <MainLayout>
                <Component {...pageProps} />
                <Chat />
              </MainLayout>
            </CartProvider>
          </LogoProvider>
        </DesignProvider>
      </ThemeProvider>
    </SWRConfig>
  )
}