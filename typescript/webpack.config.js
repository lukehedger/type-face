const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    historyApiFallback: true,
    port: 3000,
    stats: 'errors-only',
  },
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, './app'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, './static', 'favicon.ico'),
      template: path.resolve(__dirname, './static', 'index.html')
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
}
