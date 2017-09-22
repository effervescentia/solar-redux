const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src',
  output: 'app.js',

  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },

  plugins: [
    new HTMLPlugin({ template: 'index.html' }),
    new ExtractTextPlugin({ filename: 'main.css' })
  ],

  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'awesome-typescript-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader',
      options: {
        attrs: ['link:href']
      }
    }, {
      test: /\.css$/,
      include: /styles/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader']
      })
    }]
  },

  devServer: {
    port: 8080,
    historyApiFallback: true
  }
};
