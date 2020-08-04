const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CSSNano = require('cssnano');
const webpack = require('webpack');

process.env.NODE_ENV = 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API_URL': JSON.stringify('http://mars-rover-be.eu-west-2.elasticbeanstalk.com'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      title: 'Retropolis',
      template: 'public/index.html',
      favicon: './public/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /(\.css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [CSSNano],
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  }
};
