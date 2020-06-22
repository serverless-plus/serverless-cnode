require('dotenv').config();
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const withPlugins = require('next-compose-plugins');

const isProd = process.env.NODE_ENV === 'production';
const CDN_URL = 'https://static.cnode.yuga.chat';

const config = withPlugins([], {
  env: {
    STATIC_URL: isProd
      ? CDN_URL
      : `http://localhost:${parseInt(process.env.PORT, 10) || 8000}`,
  },
  assetPrefix: isProd ? CDN_URL : '',
  webpack(config, options) {
    config.plugins = config.plugins || [];
    // Do not run type checking twice:
    // https://github.com/Realytics/fork-ts-checker-webpack-plugin#options
    //
    if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin());

    return config;
  },
});

module.exports = config;
