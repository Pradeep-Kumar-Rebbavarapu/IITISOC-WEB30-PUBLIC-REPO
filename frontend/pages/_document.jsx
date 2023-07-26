import { store } from '@/store/store'
import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react'
import imageDirectURL from '../public/images/logo.png'
export default function Document() {

  return (
    <Html lang="en">
      <head>
        
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
