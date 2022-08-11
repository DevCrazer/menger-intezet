import "../styles/globals.scss";
import type { AppProps } from "next/app";
import * as _ from "lodash";

function MengerApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MengerApp;
