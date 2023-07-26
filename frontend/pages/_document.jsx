import { store } from '@/store/store'
import { Html, Head, Main, NextScript } from 'next/document'
import { useEffect } from 'react'

export default function Document() {

  return (
    <Html lang="en">
      <head>
        
        <meta property="twitter:image" content="https://drive.google.com/file/d/1jBGW4IqOp00Hqjs4SZJTf5Aap3d58xeL/view?usp=drive_link" />
        <meta property="twitter:title" content="The Cynaptics Club - IIT Indore" />
        <meta property="twitter:description" content="The Cynaptics Club(AI/ML) - IIT INDORE" />

        
        <meta property="og:title" content="The Cynaptics Club - IIT Indore" />
        <meta property="og:description" content="The Cynaptics Club(AI/ML) - IIT INDORE" />
        <meta property="og:image" content="https://drive.google.com/file/d/1jBGW4IqOp00Hqjs4SZJTf5Aap3d58xeL/view?usp=drive_link" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" /> 
        <meta property="og:image:height" content="630" /> 
        <meta property="og:image:alt" content="The Cynaptics Club - IIT Indore" /> 
        <meta property="og:type" content="website" /> 
        <meta property="og:url" content={process.env.SITE_URL} />

        
        <meta name="description" content="The Cynaptics Club(AI/ML) - IIT INDORE" />
        <meta itemprop="name" content="The Cynaptics Club - IIT Indore" />
        <meta itemprop="description" content="The Cynaptics Club(AI/ML) - IIT INDORE" />
        <meta itemprop="image" content="https://drive.google.com/file/d/1jBGW4IqOp00Hqjs4SZJTf5Aap3d58xeL/view?usp=drive_link" />
        <meta name="keywords" content="your, keywords, here" />
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
