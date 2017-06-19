const path = require('path');
const webpack = require('webpack');
const { extend } = require('lodash');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

/**
 * Production config - build specified component with externalized React and React Dom
 */
const prodConfig =  {
  entry: {
    demo: ['./src/client/components/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd'
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};

const commonConfig = {
  bail: true,
  plugins: [
    new ProgressBarPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ContextReplacementPlugin(
      new RegExp('\\' + path.sep + 'node_modules\\' + path.sep + 'moment\\' + path.sep + 'locale'),
      /en|de/
    ),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        // don't show unreachable variables etc
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  ],

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.json', '.jsx', '.js']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/, loader: "style-loader!css-loader"
      },
      { test: /\.less$/, loader: 'style!css!less'},
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src')
        ],
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-object-assign', 'transform-decorators-legacy', 'lodash']
        }
      }
    ]
  }
};

module.exports = [
  extend(
    prodConfig,
    commonConfig
  )
];
