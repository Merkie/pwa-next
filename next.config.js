/** @type {import('next').NextConfig} */
let withPWA = require('next-pwa');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    dest: 'public',
  }
}

module.exports = withPWA(nextConfig)
