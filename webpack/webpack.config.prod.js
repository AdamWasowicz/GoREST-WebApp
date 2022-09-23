const path = require('path');
const pathResolver = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');


module.exports = {

  entry: {
    index: pathResolver(__dirname, '..', 'src', 'index.tsx'),
  },

  watchOptions: {
    poll: true
  },

  mode: 'production',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },

      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },

    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, '../build'),
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
      template: 'src/index.html',
    }),

    new EnvironmentPlugin({
      REACT_APP_API_URL: ' https://gorest.co.in',
      REACT_APP_MODE: 'Production',
    })
  ],
};