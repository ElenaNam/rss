const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin'); 
const path = require('path');


module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {test: /\.svg$/, use: 'svg-inline-loader'},
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},      
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "src/assets/image", to: "img" },
        { from: "src/assets/audio", to: "audio" },
      ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    overlay: true,
    open: true,
    port: 8080,
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}
