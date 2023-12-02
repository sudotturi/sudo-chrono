/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flowbite.com',
        port: '',
        pathname: 'docs/images/people/**',
      },
    ],
  },
})

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flowbite.com',
        port: '',
        pathname: '/docs/images/people/**',
      },
    ],
  },
}