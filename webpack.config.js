module.exports = {
  devtool: 'eval-source-map',
  entry: {
    main: [
      './client/src/app.js'
    ]
  },
  output: {
    filename: './client/dist/app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}
