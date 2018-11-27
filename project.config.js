const path = require('path')

module.exports = {
  basePath: process.env.NODE_ENV === 'production' ? '/backend/' : '/',
  entry:    {
    vendors: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'mobx-react', 
      'mobx',
      '@babel/polyfill',
      'es6-promise',
      'core-js',
    ],
    bundle: './src/index.js',
  },
  resolve: {
    alias: {
      '@@public':   path.resolve('public'),
      '@asset':     path.resolve('src', 'asset'),
      '@component': path.resolve('src', 'component'),
      '@model':     path.resolve('src', 'model'),
      '@page':      path.resolve('src', 'page'),
      '@service':   path.resolve('src', 'service'),
      '@util':      path.resolve('src', 'util'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  devServer: {
    url:    'http://dev.tangjc.com',
    target: '/share-cms',
    port:   10022,
  },
}