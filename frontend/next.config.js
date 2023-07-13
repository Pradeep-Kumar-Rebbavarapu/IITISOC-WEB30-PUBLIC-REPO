/** @type {import('next').NextConfig} */
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

module.exports = nextConfig
