const webpackConfig = require( './webpack.config' );

module.exports = Object.assign( webpackConfig, {
  entry: [
    'webpack-dev-server/client?http://localhost:' + 3000,
    'webpack/hot/only-dev-server',
    './src/main.js'
  ]
});
