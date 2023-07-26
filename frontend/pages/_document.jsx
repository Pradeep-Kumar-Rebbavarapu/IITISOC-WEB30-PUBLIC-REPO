import { store } from '@/store/store'
import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react'

export default function Document() {
  const imageDirectURL = `${process.env.SITE_URL}/images/logo.png`
  return (
    <Html lang="en">
      <head>
      <link rel="manifest" href="/manifest.webmanifest"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#ffc40d" />
          <meta name="theme-color" content="#0D5BE1" />
      <meta property="twitter:image" content={imageDirectURL} />
        <meta property="twitter:title" content="ConferoLive - Meet Live" />
        <meta property="twitter:description" content="ConferoLive - Meet Live" />

        <meta property="og:title" content="ConferoLive - Meet Live" />
        <meta property="og:description" content="ConferoLive - Meet Live" />
        <meta property="og:image" content={imageDirectURL} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="ConferoLive - Meet Live" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.SITE_URL} />

        <meta name="description" content="ConferoLive - Meet Live" />
        <meta itemprop="name" content="ConferoLive - Meet Live" />
        <meta itemprop="description" content="ConferoLive - Meet Live" />
        <meta itemprop="image" content={imageDirectURL} />
        <meta name="keywords" content="Video Conferencing ConferoLive Next js Django Django Rest Framework" />
        <meta name="author" content="Your Name" />
        <meta name="robots" content="index, follow" />
      </head>
    <Head />
    <body className=''>
      <Main />
      <NextScript />
    </body>
    </Html >
  )
}
