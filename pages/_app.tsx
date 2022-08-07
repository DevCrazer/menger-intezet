import '../styles/globals.scss'
import type { AppProps } from 'next/app'

function MengerApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MengerApp
