const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const pages = [];

fs.readdirSync(path.resolve(__dirname, 'src', 'pages')).filter((file) => {
  return file.indexOf('base') !==0;
}).forEach((file) => {
  pages.push(file.split('/',2));
});


module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: '[path][name].[ext]'
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader'
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
        }
      }
    ]
  },
  devServer: {
    port: 4200,
    open: isDev,

  },
  plugins: [
    new CleanWebpackPlugin(),
    ...pages.map(fileName => new HtmlWebpackPlugin({
      filename: `${fileName}.html`,
      template: `./pages/${fileName}/${fileName}.pug`,
      inject: 'body'
    })),
    new FaviconsWebpackPlugin('theme/favicon.svg'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],

}
