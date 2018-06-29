require( 'dotenv' ).config();
const webpackConfig = require( './webpack.config' );
const port = process.env.DEVSERVER_PORT;
module.exports = Object.assign( webpackConfig, {
	entry: [
		'webpack-dev-server/client?http://localhost:' + port,
		//'webpack/hot/only-dev-server',
		'./src/main.js'
	]
});
