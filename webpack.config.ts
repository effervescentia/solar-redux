import HTMLPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

module.exports = {
  entry: './src',
  output: {
    filename: 'app.js'
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },

  plugins: [
    new HTMLPlugin({ template: 'index.html' }),
    new MiniCssExtractPlugin({ filename: 'main.css' })
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          attrs: ['link:href']
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        include: /styles/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },

  devServer: {
    port: 8080,
    historyApiFallback: true
  }
};
