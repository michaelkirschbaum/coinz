const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hot: true,
    proxy: {
      '/api': {
        target: 'http://jobcoin.gemini.com/customary',
        secure: false,
        changeOrigin: true,
      },
    },
  }
});
