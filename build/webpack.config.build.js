const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');//静态文件复制
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//css压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//css抽离
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//清除dist输出目录
const HtmlWebpackPlugin = require('html-webpack-plugin')//html打包
const fs = require('fs')
const srcRoot = path.resolve(__dirname, '../src')
const distPath = path.resolve(__dirname, '../dist')
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
  mode: 'production',
  entry: entryArray,
  resolve: {
    alias: {
      component: path.resolve(srcRoot, 'component'),
      common: path.resolve(srcRoot, 'common')
    },
    extensions: ['.js', '.jsx']
  },
  // 输出
  output: {
    path: distPath,
    filename: 'js/[name].[hash].min.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/, 
        use: [
          { loader: 'babel-loader' }, 
          { loader: 'eslint-loader' }
        ], 
        include: srcRoot },
      // 添加css loader
      {
        test: /\.css$/, use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../' //不然抽离出css会导致图片位置出错
            }
          }, 'css-loader',], include: srcRoot
      },
      {
        // 添加scss loader
        test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 
        {
          loader: 'css-loader',
        }, 
        'sass-loader', 
        {
          loader: 'sass-resources-loader',
          options: {
            // 添加公共样式函数
            resources: srcRoot + '/common/style/function.scss',
          }
        }], include: srcRoot
      },
      // 压缩图片
      //?limit=8192&name=./images/[name].[hash].[ext]
      { 
        test: /\.(png|jpg|jpeg)$/, 
        use: 'url-loader', include: srcRoot 
      }
    ]
  },

  // 抽离多次复用的文件
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'common'
        }
      }
    }
  },

  plugins: [
    // 清空dist目录
    new CleanWebpackPlugin(),
    // 抽离css文件
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].[hash].css',
    }),
    // 压缩css文件
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true
          },
          normalizeUnicode: false
        }],
      },
      canPrint: true
    }),
    // 拷贝不变的文件 例如static下的图片资源
    new CopyPlugin([
      { 
        from: path.resolve(__dirname, '../dev/json'), 
        to: path.resolve(distPath, 'json') 
      },
      { 
        from: path.resolve(__dirname, '../src/static'), 
        to: path.resolve(distPath, 'static') 
      },
    ]),
  ].concat(htmlArray)
}