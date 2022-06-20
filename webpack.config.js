const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { generateHtmlPlugins } = require('./pugHtmlPlugin');

const htmlPlugins = generateHtmlPlugins('./src/pages', 'pages');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

module.exports = () => {
  const config = {
    mode: mode,
    devServer: {
      open: true,
      static: {
        directory: './src',
        watch: true,
      },
    },
    devtool: mode === 'production' ? false : 'source-map',
    entry: path.resolve(__dirname, './src/index.ts'),
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /.\pug$/,
          loader: 'pug-loader',
          exclude: /(node_modules|bower_components)/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      assetModuleFilename: 'assets/[hash][ext][query]',
    },

    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.pug',
      }),
    ].concat(htmlPlugins),
  };
  return config;
};
