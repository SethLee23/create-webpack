const path = require('path');
// 抽离style文件，创建版本号
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const devMode = process.env.NODE_ENV !== 'production'; // 判断当前环境是开发环境还是 部署环境，主要是 mode属性的设置值。
//压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//将js和css文件直接引入html文件中，解决出现版本号变化无法直接引入问题
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    //   给js加上版本号
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
      {
        test: /\.(sa|sc|c)ss$/,
        rules: [{
            test: /\.(sc|c|sa)ss$/,
            //从右向左
            use: [
              // 'style-loader',
               MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  //加上sourcemap追踪源文件（css，sass） 
                  sourceMap: true
                }
              },
              // 注意postcss-loader在cssloader下面，loader从后往前加载
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  // 如果后面有requirexxx最后使用identify证明身份
                  ident: 'postcss',
                  plugins: (loader) => [
                    require('autoprefixer')({
                      //设置浏览器范围
                      browsers: ['> 0.15% in CN']
                    }),
                  ]
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  data: "$env: " + process.env.NODE_ENV + ";",
                  sourceMap: true
                }
              }
      
            ]
          }]
      }
    ]
  },
  plugins: [
    //   抽取样式文件
    new MiniCssExtractPlugin({
    // 设置最终输出的文件名
      filename: '[name].[hash].css', 
      chunkFilename: '[id].[hash].css'
    }),
    // html插件，使文件直接引入js和css
    new HtmlWebpackPlugin({
        title: 'seth-title', // 默认值：Webpack App
        filename: 'main.html', // 指定输出文件、默认值： 'index.html'
        template: path.resolve(__dirname, 'src/index.html'),
        // 启用压缩
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeAttributeQuotes: true // 移除属性的引号
        }
      })
  ],
// 压缩css文件、js文件
  optimization: {
    minimizer: [
        new OptimizeCSSAssetsPlugin({}),
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true // set to true if you want JS source maps
          })
        ],  
  }
};