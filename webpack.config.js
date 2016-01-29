
var path = require('path');
var webpack = require('webpack');

module.exports = {
  //devtool: 'eval-source-map',
//  context: __dirname + '/client',
  //context: __dirname + '/client/dist',
  entry: {
    //javascript: './src/app.js',
  //  html: './index.html',
    main: [
      'webpack-dev-server/client?http://localhost:8080/client/',
      'webpack/hot/only-dev-server',
      './client/src/app.js'
    ]
  },
  output: {
    filename: 'app.js',
    path: __dirname + '/client/dist',
    //publicPath: '/client/dist/',
    publicPath: 'http://localhost:8080/client/dist/'
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
      //  include: __dirname + '/src',
        //include: __dirname +  '/src',
        //loader: 'react-hot!babel'
        loaders: ['react-hot', 'babel']
      },
      // {
      //   test: /\.html$/,
      //   loader: "file?name=[name].[ext]",
      // }
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
