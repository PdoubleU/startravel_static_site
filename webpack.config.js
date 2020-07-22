/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
require('babel-polyfill');
require('fetch-ponyfill');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    'fetch-ponyfill',
    './src/js/main.js',
    './src/style/main.scss',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          'postcss-loader',
          'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: ['svg-inline-loader',
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.bundle.css',
    }),
    new HtmlWebpackPlugin({
      title: 'index.html',
      template: './src/index.html',
    }),
  ],
};
