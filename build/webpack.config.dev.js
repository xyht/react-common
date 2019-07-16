const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const srcRoot = path.resolve(__dirname, '../src')
const devPath = path.resolve(__dirname, '../dev')
const pageDir = path.resolve(srcRoot, 'page')
const mainFile = 'index.js'

function getHtmlArray(entryArray) {
  // 得到其中的html文件
  let htmlArray = []
  Object.keys(entryArray).forEach((key) => {
    htmlArray.push(new HtmlWebpackPlugin({
      filename: key + '.html',
      template: 'index.html',
      chunks: ['common', key]
    }))
  })
  return htmlArray
}

function getEntry() {
  /*遍历目录 */
  let entryMap = {};

  fs.readdirSync(pageDir).forEach((pathname) => {
    let fullPathName = path.resolve(pageDir, pathname)
    let stat = fs.statSync(fullPathName)
    let fileName = path.resolve(fullPathName, mainFile)

    if (stat.isDirectory() && fs.existsSync(fileName)) {
      entryMap[pathname] = fileName
    }
  })
  return entryMap
}

const entryArray = getEntry()
const htmlArray = getHtmlArray(entryArray)

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: devPath,
    host: '0.0.0.0',
    hot: true
  },
  entry: entryArray,
  resolve: {
    alias: {
      component: path.resolve(srcRoot, 'component'),
      common: path.resolve(srcRoot, 'common')
    },
    extensions: ['.js', '.jsx'] //尝试按顺序解决这些扩展
  },
  // 输出
  output: {
    path: devPath,
    filename: '[name].min.js'
  },
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/, 
        use: [
          { loader: 'babel-loader' }, 
          { loader: 'eslint-loader' }
        ], 
        include: srcRoot 
      },
      // 添加css loader
      { 
        test: /\.css$/, 
        use: ['style-loader', 'css-loader',], 
        include: srcRoot 
      },
      {
        // 添加scss loader
        test: /\.scss$/, 
        use: [
          'style-loader', 
          'css-loader', 
          'sass-loader', 
          {
          loader: 'sass-resources-loader',
          options: {
            // 添加公共样式
            resources: srcRoot + '/common/style/function.scss',
          }
        }], include: srcRoot
      },
      // 压缩图片test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      { 
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, 
        use: 'url-loader?limit=8192', 
        include: srcRoot 
      }
    ]
  },

  // 抽离多次复用的css文件
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'common'
        }
      }
    }
  },

  // webpack插件
  plugins: [
    // 热加载
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ].concat(htmlArray)
}