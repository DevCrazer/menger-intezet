/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";

export default function PWAHead() {
  return (
    <Head>
      <meta name="application-name" content="Menger Intézet" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Menger Intézet" />
      <meta name="description" content="Menger Intézet" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#000000" />
      
      <link rel="manifest" href="/manifest.json" />

      <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />
      <link rel='apple-touch-icon' sizes='152x152' href='/assets/icons/icon-152x152.png' />
      <link rel='apple-touch-icon' sizes='192x192' href='/assets/icons/icon-192x192.png' />
      <link rel='apple-touch-icon' sizes='144x144' href='/assets/icons/icon-144x144.png' />

      <link rel='icon' type='image/png' sizes='32x32' href='/assets/icons/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/assets/icons/favicon-16x16.png' />

      <link rel='shortcut icon' href='/favicon.ico' />

      <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700;900&family=Oswald:wght@200;300;400;500;600;700&display=swap' />
          
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:url' content='https://menger.hu' />
      <meta name='twitter:title' content='Menger Intézet' />
      <meta name='twitter:description' content='Menger Intézet' />
      <meta name='twitter:image' content='/assets/icons/android-chrome-192x192.png' />
      <meta name='twitter:creator' content='@ValPasch' />

      <meta property='og:type' content='website' />
      <meta property='og:title' content='Menger Intézet' />
      <meta property='og:description' content='Menger Intézet' />
      <meta property='og:site_name' content='Menger Intézet' />
      <meta property='og:url' content='https://menger.hu' />
      {/* <meta property='og:image' content='https://yourdomain.com/icons/apple-touch-icon.png' /> */}

    </Head>
  );
}
