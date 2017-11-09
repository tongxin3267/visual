var path = require('path')
var utils = require('./utils')
var config = require('../config')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var oTestCss = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: true //css压缩
        }
      }
    ]
  })
}

var oEntry = { //prduction
  app: './src/index/main.js',
  backend: './src/main.js',
}

module.exports = {
  entry: process.env.NODE_ENV !== 'production' ? {
    // app: './src/index/main.js',
    backend: './src/main.js',
  } : oEntry,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'config': resolve('src/config'),
      'mixins': resolve('src/mixins'),
      'components': resolve('src/components'),
      'views': resolve('src/views'),
      'html2canvas': 'assets/js/html2canvas.min'
    }
  },
  module: {
    rules: [
      process.env.NODE_ENV !== 'production' ? {} : oTestCss,
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
