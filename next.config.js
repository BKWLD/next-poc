require('dotenv-vault-core').config()

const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.js'
  }
}

module.exports = withVanillaExtract(nextConfig)
