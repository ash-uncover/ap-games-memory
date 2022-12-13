/* eslint-disable */

const webpack = require('webpack')
const path = require('path')

const DIR_DOCS = path.resolve(__dirname, 'docs')
const DIR_SRC = path.resolve(__dirname, 'src')
const DIR_NODE_MODULES = path.resolve(__dirname, 'node_modules')

const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const transformPlugin = (buffer) => {
  const plugin = JSON.parse(buffer.toString())
  plugin.url = 'https://ash-uncover.github.io/ap-games-memory'
  return JSON.stringify(plugin, null, 2)
}

module.exports = {
  entry: path.resolve(DIR_SRC, 'index_docs.tsx'),

  output: {
    clean: true,
    path: DIR_DOCS,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, '_redirects'), to: '.' },
        { from: path.resolve(__dirname, 'public'), to: '.' },
        { from: path.resolve(__dirname, 'plugin.json'), to: '.', transform: transformPlugin },
      ],
    }),
    new webpack.EnvironmentPlugin({
      AP_GAMES_MEMORY_PLUGIN: 'https://ash-uncover.github.io/ap-games-memory/plugin.json',
      AP_GAMES_MEMORY_PUBLIC: '/ap-games-memory'
    }),
    new HtmlWebpackPlugin({
      template: './src/index_docs.html',
      title: 'AP Memory',
      publicPath: '/ap-games-memory'
    }),
  ],

  module: {
    rules: [
      {
        test: /.(jsx|js)$/,
        include: DIR_SRC,
        exclude: DIR_NODE_MODULES,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.tsx?$/,
        include: DIR_SRC,
        exclude: DIR_NODE_MODULES,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.webpack.json'
            }
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: {
            url: {
              filter: (url, resourcePath) => {
                // Don't handle `images` urls
                if (url.includes('images/')) {
                  return false;
                }
                return true;
              },
            },
          } },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]',
        },
      },
      {
        test: /\.(mp3|flac)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'sound/[name][ext][query]'
        }
      },
    ],
  },
}
