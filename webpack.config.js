var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/client/index.html',
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
  entry: [
    './client/index.js'
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  output: {
    filename: "index_bundle.js",
    path: __dirname + '/public'
  },
  plugins: [HTMLWebpackPluginConfig]
};