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
    './src/js/index.js',
    './src/style/index.scss',
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
        use: [
          {
            loader: 'style-loader'
          },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { url: false}
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: 'sass-loader'
          },

        ],
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
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/subpages/poland.html',
      filename: './subpages/poland.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/subpages/czechia.html',
      filename: './subpages/czechia.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/subpages/germany.html',
      filename: './subpages/germany.html'
    }),
  ],
};
