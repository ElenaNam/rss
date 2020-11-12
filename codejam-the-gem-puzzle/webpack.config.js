const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {    
  
    mode: 'development',          
    devtool: 'inline-source-map',
    watch: true,
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'main.js',
    },

    plugins: [
        new CleanWebpackPlugin(),
    ],
        
}