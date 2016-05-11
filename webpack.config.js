var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var production = process.env.NODE_ENV === "production";

module.exports = {
  entry: [
    'babel-polyfill',
    './client/index.jsx'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  output: {
    filename: "index_bundle.js",
    path: __dirname + '/public'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/client/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ].concat(production ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  ] : [])
};