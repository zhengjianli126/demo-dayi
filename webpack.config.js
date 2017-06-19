const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = {
  entry: './src/index.js',
  output: { //输出
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map', // 编译模式
  module: {
    rules: [{
        test: /\.js$/, //babel解析器
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.html$/,
        use: 'html-withimg-loader'
      }, {
        test: /\.json$/,
        use: 'json-loader'
      },

      {
        test: /\.(png|jpg)$/, // img压缩器
        use: 'url-loader?limit=8192&name=images/[hash:4].[name].[ext]'
      }, {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
              loader: "css-loader",
              options: {
                minimize: true
              }
            }, "postcss-loader",
            {
              loader: "sass-loader"
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ // html代码热加载
      template: './index.html'
    }),
    new OpenBrowserPlugin({ // 自动弹出
      url: 'http://localhost:9010'
    }),
    new webpack.ProvidePlugin({ //jquery解析器
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new uglifyJsPlugin({ //js代码压缩
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("[name].css")
  ],
  devServer: { // 启动服务配置
    contentBase: "./index.html",
    port: 9010,
    inline: true
  }
}
module.exports = config;
