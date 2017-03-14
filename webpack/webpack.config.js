/**
 * webpack2 配置
 */
const webpack = require('webpack')
const port = 8099
/**
 * 路径
 */
const path = require('path')
const root_path = path.resolve(__dirname, '../');
const app_path = path.resolve(root_path, './app');
const tmpl_path = path.resolve(root_path, './app/template');
const release_path = path.resolve(root_path, './app/dist');

/** 插件 */
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = {
  entry: {
    app: path.resolve(app_path, 'index.js'),
    vendor: ['vue', 'vue-router', 'vue-resource', 'vuex'] // 公共库不会经常变动
  }, // 入口文件
  output: {
    filename: '[name].release.js',
    path: release_path,
    devtoolLineToLine: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        include: [path.resolve(app_path)],
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      }, {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      }, {
        test: /\.js$/,
        include: [path.resolve(app_path)],
        exclude: [path.resolve(root_path, 'node_modules')],
        use: [
          {
            loader: 'babel-loader'
          }
        ]

      }, {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader?limit=0'
      }, {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  context: __dirname,
  target: 'web',
  stats: { //object
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true
  },
  resolve: {
    modules: [
      "node_modules", path.resolve(app_path)
    ],
    alias: {
      'vue': 'vue/dist/vue.js'
    },
    extensions: ['.js', '.vue', '.css', '.scss']
  },
  plugins: [
    new webpack
      .optimize
      .CommonsChunkPlugin({ // 公共库
        name: "vendor",
        minChunks: Infinity
      }),
    new webpack.ProvidePlugin({
      _config: './config/' + (process.env.NODE_ENV || '_dev') // 避免开发和发布时频繁切换
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.vue$/,
      options: {
        vue: {
          loaders: {
            css: 'vue-style-loader!css-loader',
            scss: 'vue-style-loader!css-loader!sass-loader'
          },
          postcss: [require('autoprefixer')({browsers: ['last 2 versions']})]
        }
      }
    }),
    new webpack.LoaderOptionsPlugin({/**scss文件postcss配置 */
      test: /\.scss$/,
      options: {
        postcss: function () {
          return [require("autoprefixer")({browsers: ['last 2 versions']})]
        }
      }
    }),
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      title: 'vue2', //设置title的名字
      filename: 'index.html', //设置这个html的文件名
      template: path.resolve(tmpl_path, 'template.ejs'), //要使用的模块的路径
      inject: 'body', //把模板注入到哪个标签后 'body'
      // favicon: './images/favico.ico', // 图标，
      chunks: [
        'app', 'vendor'
      ], //限定引入文件
      minify: false, //生成的html文件压缩
      hash: true, //是否hash
      cache: true, //是否缓存
      showErrors: false //显示错误
    })
  ]
}

if (process.env.NODE_ENV === '_dev') {
  config.devtool = 'cheap-source-map'
  config.devServer = {
    /*proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },*/
    port: port,
    // contentBase: path.join(app_path, 'dist'), // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
    // ...
  }
} else {
  config.devtool = 'cheap-module-source-map'
  config
    .plugins
    .concat([
      new CleanWebpackPlugin([path.resolve(app_path, 'dist')]),
      new webpack
        .optimize
        .UglifyJsPlugin({
          compress: {
            warnings: false
          }
        }),
      new webpack
        .optimize
        .OccurrenceOrderPlugin()
    ])
}

module.exports = config