
var path = require('path');
var webpack = require('webpack');
require('es6-promise').polyfill();

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/only-dev-server',
      './src/app.js'
    ],
    //vendors: './src/css/bootstrap.css'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
    //publicPath: '/client/dist/',
    publicPath: 'http://localhost:8080/dist/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
}
