require('dotenv').config();
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const withPlugins = require('next-compose-plugins');

const isProd = process.env.NODE_ENV === 'production';

// if not use CDN, change to your cos access domain
const STATIC_URL = `https://${process.env.CDN_DOMAIN}`;

const config = withPlugins([], {
  env: {
    STATIC_URL: isProd
      ? STATIC_URL
      : `http://localhost:${parseInt(process.env.PORT, 10) || 8000}`,
  },
  assetPrefix: isProd ? STATIC_URL : '',
  webpack(config, options) {
    config.plugins = config.plugins || [];
    if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin());

    return config;
  },
});

module.exports = config;
