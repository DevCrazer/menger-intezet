/* eslint-disable @next/next/no-page-custom-font */
import React from "react";

export default function PWAHead({
  title,
  image,
  url,
}: {
  title: string;
  image: string;
  url: string;
}) {
  return (
    <>
      <title>{title}</title>

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content="Menger Intézet" />
      <meta property="og:site_name" content="Menger Intézet" />
      <meta property="og:url" content="https://mengerblog.com" />
      <meta property="og:image" content={image} />


      <meta name="type" content="website" />
      <meta name="title" content={title} />
      <meta name="description" content="Menger Intézet" />
      <meta name="site_name" content="Menger Intézet" />
      <meta name="url" content="https://mengerblog.com" />
      <meta name="image" content={image} />

      <meta name="application-name" content="Menger Intézet" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Menger Intézet" />
      <meta name="description" content="Menger Intézet" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#000000" />

      <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/icons/touch-icon-ipad.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/touch-icon-iphone-retina.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="/icons/touch-icon-ipad-retina.png"
      />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="/favicon.ico" />

      <link rel="manifest" href="/manifest.json" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700;900&family=Oswald:wght@200;300;400;500;600;700&display=swap"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://mengerblog.com" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content="Menger Intézet" />
      <meta name="twitter:image" content={image} />
      {/* <meta name="twitter:creator" content="@ValPasch" /> */}

      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_2048.png"
        sizes="2048x2732"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_1668.png"
        sizes="1668x2224"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_1536.png"
        sizes="1536x2048"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_1125.png"
        sizes="1125x2436"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_1242.png"
        sizes="1242x2208"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_750.png"
        sizes="750x1334"
      />
      <link
        rel="apple-touch-startup-image"
        href="/images/apple_splash_640.png"
        sizes="640x1136"
      />
    </>
  );
}
