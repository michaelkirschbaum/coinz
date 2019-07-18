const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(jpg)$/,
        use: [
          "file-loader"
        ]
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new webpack.DefinePlugin({
      'API_URL': process.env.NODE_ENV === 'production'
        ? JSON.stringify('https://jobcoin.gemini.com/customary')
        : JSON.stringify('')
    })
  ]
}