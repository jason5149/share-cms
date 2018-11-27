module.exports = {
  apps: [{
    name:   'share-cms',
    script: './server.js',
    watch:  true,
    env:    {
      'NODE_ENV': 'development',
    },
    env_production: {
       'NODE_ENV': 'production',
    },
  }],
}