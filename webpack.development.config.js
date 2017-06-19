const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/client/demo/index.js',
  output: {
    publicPath: `/static/`,
    path: path.resolve(__dirname, 'static'),
    filename: 'bundle.js',
    library: 'supplier',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    root: path.join(__dirname, "node_modules"),
    fallback: [path.join(__dirname, "node_modules")],
    modulesDirectories: ['node_modules'],
    extensions: ['', '.json', '.js']
  },

  resolveLoader: {
    fallback: [path.join(__dirname, "node_modules")],
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  postcss: function () {
    return [require('autoprefixer')];
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test   : /\.(png|jpg|jpeg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=.]+)?$/,
        loader : 'file-loader'
      },
      {
        test: /\.md$/,
        loader: 'raw-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css!postcss-loader!less?sourceMap'
      },
      {
        test: /\.css$/,
        loader: "style!css-loader!postcss-loader"
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src')
        ],
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-decorators-legacy', 'lodash']
        }
      }
    ]
  }
};
