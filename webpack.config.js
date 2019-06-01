const path = require('path')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    //resolve方法将相对路径转换为绝对路径
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.(sc|c|sa)ss$/,
      //从右向左
      use: [
        // 'style-loader',
        
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
}