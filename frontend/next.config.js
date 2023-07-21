/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

({  
    dest: 'public',
    register: true,
    skipWaiting: true,
    
})
const nextConfig = {
  reactStrictMode: false,
  
  async rewrites() {
    return [
      {
        source: '/activate/:key',
        destination: '/activate',
      },
    ];
  },
  images : {
    remotePatterns:[
      {
        hostname:"www.htmlhints.com"
      }
    ]
  }
}

module.exports = withPWA(nextConfig)
