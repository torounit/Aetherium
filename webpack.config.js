require( 'dotenv' ).config();
const path = require( 'path' );
const basename = path.basename;
const { VueLoaderPlugin } = require( 'vue-loader' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const webpack = require( 'webpack' );
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' );
const env = process.env.NODE_ENV;
const wpPort = process.env.WORDPRESS_PORT;
const port = process.env.DEVSERVER_PORT;


module.exports = {
	mode: env || 'development',
	entry: [
		'./src/main.js'
	],
	output: {
		path: __dirname,
		publicPath: '/wp-content/themes/' + basename( __dirname ) + '/',
		filename: 'dist/[name].bundle.js'
	},
	optimization: {
		splitChunks: {
			name: 'vendor',
			chunks: 'initial'
		}
	},
	plugins: [

		// make sure to include the plugin!
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: 'dist/[name].css'
		}),
		new UglifyJSPlugin()
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ( 'production' === process.env.NODE_ENV ) ? [
					'vue-style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader?minimize'
				] : [
					'vue-style-loader',
					'css-loader?minimize'
				]
			}, {
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {}

					// other vue-loader options go here
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		},
		extensions: [ '*', '.js', '.vue', '.json' ]
	},
	performance: {
		hints: false
	},
	devtool: '#inline-source-map',
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
					port: wpPort
				}
			}
		}
	}
};

if ( 'production' === process.env.NODE_ENV ) {
	module.exports.devtool = '#source-map';

	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = ( module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		})
	]);
}
