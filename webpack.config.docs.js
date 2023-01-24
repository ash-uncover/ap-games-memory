/* eslint-disable */

const webpack = require('webpack')
const path = require('path')

const { merge } = require('webpack-merge')
const base = require('./webpack.config.base.js')

const DIR_DOCS = path.resolve(__dirname, 'docs')
const DIR_PUBLIC = path.resolve(__dirname, 'public')

const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const transformPlugin = (buffer) => {
  const plugin = JSON.parse(buffer.toString())
  plugin.url = 'https://ash-uncover.github.io/ap-games-memory'
  plugin.provides['ap-games/game'].memory.elements.main.url = '#'
  return JSON.stringify(plugin, null, 2)
}

module.exports = merge(base, {
  mode: 'production',

  output: {
    clean: true,
    path: DIR_DOCS,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
      favicon: './public/favicon.png',
      template: './src/index_docs.html',
      title: 'AP Memory',
      publicPath: '/ap-games-memory'
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'plugin.json'),
        to: '.',
        transform: transformPlugin
      }, {
        from: DIR_PUBLIC,
        to: '.',
      }],
    }),
    new webpack.EnvironmentPlugin({
      AP_GAMES_MEMORY_PLUGIN: 'https://ash-uncover.github.io/ap-games-memory/plugin.json',
      AP_GAMES_MEMORY_PUBLIC: '/ap-games-memory',
      AP_GAMES_MEMORY_ENVIRONMENT: 'github',
    }),
  ]
})
