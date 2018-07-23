const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    app: path.join(__dirname, 'src', 'main.js')
  },
  output: {
    // this make sure all the assets to be accessed from root, ie bundle.js be injected by HtmlWebpackPlugin
    // as "/bundle.js". This is necessary in SPA.
    publicPath: '/',
    filename: '[name]-[hash:5].js',
    // Where to put the final 'compiled' file
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'vue$': 'vue/dist/vue.min.js',
      '@': path.resolve(__dirname, 'src'),
      }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src')
        ],
      },
      // copy the required assets to dist folder
      // use require() to get the actuall url
      {
        test: /\.(|png|jpg|mp3|ogg|atlas|txt|mp4|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              context: path.join(__dirname, 'src/assets')
            }
          }
        ]
      },
      {
        type: 'javascript/auto',
        test: /\.json/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'file-loader',
          options: { 
            name: '[name].[ext]' 
          },
        }],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
    ]
  },

  // webpack 4....
  // they just keep coming up new syntax without proper documentation...
  // https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/234
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        // things not to minify
        exclude: [],
        uglifyOptions: {
          output: {
            comments: false
          },
          sourceMap: false,
          mangle: {
            keep_fnames: true,
          },
          // remove console
          compress: {
            drop_console: true
          }
        }
      }),
    ],
    // split the vendors 
    splitChunks: {
      chunks: 'all'
    },
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'test',
      filename: 'index.html',
      inject: 'body',
      template: './src/index.html',
      env: {
        target: 'production'
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
  ],
  
  // Export full source map for debugging, maps to original source
  // This could be a little bit slow for bigger project build, but you can change it at anytime
  // to other type of source map to keep the build performance:
  //    http://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',
  devServer: {
    contentBase: './dist'
  },
}