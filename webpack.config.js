
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './client/src/app.js'
    ]
  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'client', 'dist'),
    publicPath: '/client/dist/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
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
        include: path.join(__dirname, 'client', 'src'),
        loader: 'react-hot!babel'
      }
    ]
  }
}


// examples
//
// module.exports = {
//   context: __dirname + '/app',
//   entry: {
//     javascript: "./app.js",
//     html: "./index.html"
//   },
//   output: {
//     filename: 'app.js',
//     path: __dirname + '/dist'
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loaders: ['babel-loader']
//       },
//       {
//         test: /\.jsx$/,
//         loaders: ['babel-loader']
//       },
//       {
//         test: /\.html$/,
//         loader: "file?name=[name].[ext]"
//       }
//     ]
//   }
// };
