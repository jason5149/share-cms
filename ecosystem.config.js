module.exports = {
  apps: [{
    name:      'share-cms',
    script:    './server.js',
    watch:     true,
    exec_mode: 'cluster_mode',
    env:       {
      'NODE_ENV': 'development',
    },
    env_production: {
       'NODE_ENV': 'production',
    },
  }],
}