import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { SWRConfig } from 'swr'
import { MainLayout } from '../components/layouts'
import CartProvider from '../context/cart/CartProvider'
import { Chat } from '../components/chat'
import DesignProvider from '../context/design/DesignProvider'
import LogoProvider from '@/context/logo/LogoProvider'
import { Montserrat, Poppins } from 'next/font/google'
import { SessionProvider } from "next-auth/react"

const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  preload: false
})

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  preload: false
})

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <SessionProvider session={session}>
        <ThemeProvider attribute='class'>
          <DesignProvider>
            <LogoProvider>
              <CartProvider>
                <MainLayout>
                  <style jsx global>{`
                    h1, h2, h3, h4, h5 {
                      font-family: ${montserrat.style.fontFamily};
                    }
                    p, span, button, a, input, textarea, select {
                      font-family: ${poppins.style.fontFamily};
                    }
                  `}</style>
                  <Component {...pageProps} />
                  <Chat />
                </MainLayout>
              </CartProvider>
            </LogoProvider>
          </DesignProvider>
        </ThemeProvider>
      </SessionProvider>
    </SWRConfig>
  )
}