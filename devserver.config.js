/* eslint-disable no-undef */
require( 'dotenv' ).config();
const path = require( 'path' );
const basename = path.basename;
const webpackConfig = require( './webpack.config' );
const wpPort = process.env.WORDPRESS_PORT;
const port = process.env.DEVSERVER_PORT;

module.exports = Object.assign( webpackConfig, {
	entry: [
		'webpack-dev-server/client?http://localhost:' + port,
		'webpack/hot/only-dev-server',
		'./src/main.js',
	],
	devServer: {
		// contentBase: __dirname,
		publicPath: '/wp-content/themes/' + basename( __dirname ) + '/',
		port: port,
		noInfo: true,
		historyApiFallback: true,
		disableHostCheck: true,
		hot: true,
		hotOnly: true,
		quiet: false,
		stats: { colors: true },
		proxy: {
			'**': {
				target: {
					protocol: 'http:',
					host: 'localhost',
					port: wpPort,
				},
			},
		},
	},
} );
