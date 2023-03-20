/** @type {import('next').NextConfig} */

require('dotenv-vault-core').config()

const withLinaria = require('next-with-linaria');

const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.js'
  }
}

module.exports = withLinaria(nextConfig)
