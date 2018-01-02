/* global module __dirname */

import path from 'path';
import webpack from 'webpack';
import process from 'process';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const config = {
  entry: ['babel-polyfill', './index.js'],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'bower_components'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules\/(?!(polymer-webpack-loader)\/).*/,
        use: [
          {loader: 'babel-loader'},
          {loader: 'polymer-webpack-loader', options: {processStyleLinks: true}},
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(polymer-webpack-loader)\/).*/,
        use: [
          {loader: 'babel-loader', options: {cacheDirectory: '.babel-cache'}},
        ],
      },

    ],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9011,
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.ejs'),
      inject: false,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'bower_components/webcomponentsjs/*.js'),
        to: 'bower_components/webcomponentsjs/[name].[ext]',
      },
    ]),
  ],
};

module.exports = config;
