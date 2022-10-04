import '../styles/globals.css'
import { store } from '../lib/store'
import { Provider } from 'react-redux'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export function MyApp({ 
  Component, 
  pageProps: { ...pageProps} 
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      {getLayout(
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      )}
    </>
  )
}

export default MyApp