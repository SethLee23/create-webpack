const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const devMode = process.env.NODE_ENV !== 'production'; // 判断当前环境是开发环境还是 部署环境，主要是 mode属性的设置值。

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
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
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css', // 设置最终输出的文件名
      chunkFilename: '[id].[hash].css'
    })
  ]
};