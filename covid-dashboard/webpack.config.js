const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');  
const path = require('path');


module.exports = {
  entry: './src/index.js',
   resolve: {
    alias: {
        "./images/layers.png$": path.resolve(
            __dirname,
            "./node_modules/leaflet/dist/images/layers.png"
        ),
        "./images/layers-2x.png$": path.resolve(
            __dirname,
            "./node_modules/leaflet/dist/images/layers-2x.png"
        ),
        "./images/marker-icon.png$": path.resolve(
            __dirname,
            "./node_modules/leaflet/dist/images/marker-icon.png"
        ),
        "./images/marker-icon-2x.png$": path.resolve(
            __dirname,
            "./node_modules/leaflet/dist/images/marker-icon-2x.png"
        ),
        "./images/marker-shadow.png$": path.resolve(
            __dirname,
            "./node_modules/leaflet/dist/images/marker-shadow.png"
        )
    }
/*     alias: {
      leaflet_css: __dirname + "/node_modules/leaflet/dist/leaflet.css",
      leaflet_marker: __dirname + "/node_modules/leaflet/dist/images/marker-icon.png",
      leaflet_marker_2x: __dirname + "/node_modules/leaflet/dist/images/marker-icon-2x.png",
      leaflet_marker_shadow: __dirname + "/node_modules/leaflet/dist/images/marker-shadow.png"
    } */
  }, 
  module: {
    rules: [
      /* {test: /\.(gif|jpg|png)$/, loader: "file-loader"}, */
      /* {test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader"}, */
      {test: /\.(jpe?g|png|gif)$/i,
        use: [
          {loader: "file-loader", 
          options: {
            esModule: false,
            outputPath: 'img1/',
          },
        }]},
      {test: /\.svg$/, use: 'svg-inline-loader'},
      {test: /\.css$/, use: [
        'style-loader',
        'css-loader'
      ]},
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
        { from: "src/assets/images", to: "img" },      
      ],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    overlay: true,
    open: true,
    port: 8081,
  },
  devtool: "source-map",
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}