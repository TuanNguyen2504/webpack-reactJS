const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    //name: path
    main: './src/index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc)ss$|\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|wav|ico|mp3)$/,
        use: 'file-loader',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [
    //dung de don dep, xoa cac file khong can thiet trong dist
    new CleanWebpackPlugin(),
    //dung de sap xep noi dung file index.html 1 cach hop ly voi noi dung tuong tu index.html src
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.min.css',
    }),
  ],
  optimization: {
    splitChunks: {
      //cacheGroup giup tang toc do load trang nho viec cache lai tren browser
      //nhung thu vien khong thay doi ngay
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          //dung de phan chia cac file js, tranh su import trung lap
          chunks: 'all',
        },
      },
    },
    //minifile js, css
    minimizer: [new TerserPlugin({}), new OptimizeCssAssetsPlugin({})],
  },
  //cho phep do tim loi trong file da duoc minifile
  devtool: 'inline-source-map',
};
