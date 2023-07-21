import { store } from '@/store/store'
import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react'

export default function Document() {

  return (
    <Html lang="en">
      <link rel="manifest" href="/manifest.webmanifest" />
      <link rel="apple-touch-icon" href="/images/logo.png" />
      <meta name="theme-color" content="#ffffff" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
     
      <meta
        property="twitter:image"
        content={`https://drive.google.com/file/d/1jBGW4IqOp00Hqjs4SZJTf5Aap3d58xeL/view?usp=drive_link`}
      />
      <meta
        property="twitter:title"
        content="The Cynaptics Club - IIT Indore"
      />
      <meta
        property="og:title"
        content="The Cynaptics Club - IIT Indore"
      />
      <meta
        property="twitter:description"
        content="The Cynaptics Club(AI/ML) - IIT INDORE"
      />
      <meta
        property="og:description"
        content="The Cynaptics Club(AI/ML) - IIT INDORE"
      />
      <meta
        property="og:image"
        content={`https://drive.google.com/file/d/1jBGW4IqOp00Hqjs4SZJTf5Aap3d58xeL/view?usp=drive_link`}
      />
      <meta property="og:image:type" content="jpg" />
      <meta property="og:url" content={process.env.SITE_URL} />

      <Head />
      <body className=''>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
