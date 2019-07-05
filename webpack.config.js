const path = require('path');
const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
