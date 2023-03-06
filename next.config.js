/** @type {import('next').NextConfig} */

require('dotenv-vault-core').config()

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.js'
  }
}

module.exports = nextConfig
