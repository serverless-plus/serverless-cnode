require('dotenv').config();
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withImages = require('next-images');

const config = withPlugins(
  [
    [withCSS],
    [withSass],
    // [
    //   withOptimizedImages,
    //   {
    //     inlineImageLimit: 8192,
    //     optimizeImages: false,
    //     handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
    //   },
    // ],
  ],
  {
    webpack(config, options) {
      config.plugins = config.plugins || [];
      // Do not run type checking twice:
      // https://github.com/Realytics/fork-ts-checker-webpack-plugin#options
      //
      if (options.isServer)
        config.plugins.push(new ForkTsCheckerWebpackPlugin());

      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            // options: {
            //   limit: 10000,
            //   publicPath: '/static/images/',
            //   outputPath: 'static/images/',
            //   name: '[name].[hash].[ext]',
            // },
          },
        ],
      });
      return config;
    },
  },
);

module.exports = config;
