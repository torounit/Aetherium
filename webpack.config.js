/* eslint-disable no-undef */
require( 'dotenv' ).config();
const path = require( 'path' );
const basename = path.basename;
const { VueLoaderPlugin } = require( 'vue-loader' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const webpack = require( 'webpack' );
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' );
const nodeEnv = process.env.NODE_ENV;
const mode = nodeEnv ? nodeEnv : 'development';
const enableSouceMap = mode === 'development' ? 'source-map' : false;
const config = {
	mode: mode,
	entry: [
		'./src/main.js',
	],
	output: {
		path: __dirname,
		publicPath: '/wp-content/themes/' + basename( __dirname ) + '/',
		filename: 'dist/[name].bundle.js',
	},
	optimization: {
		splitChunks: {
			name: 'vendor',
			chunks: 'initial',
		},
	},
	plugins: [

		// make sure to include the plugin!
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin( {
			filename: 'dist/[name].css',
		} ),
		new UglifyJSPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ( 'production' === mode ) ? [
					'vue-style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader?minimize',
				] : [
					'vue-style-loader',
					'css-loader?minimize',
				],
			}, {
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]',
				},
			},
		],
	},
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
		},
		extensions: [ '*', '.js', '.vue', '.json' ],
	},
	performance: {
		hints: false,
	},
	devtool: enableSouceMap,
};

if ( 'production' === mode ) {
	// http://vue-loader.vuejs.org/en/workflow/production.html
	config.plugins = ( config.plugins || [] ).concat( [
		new webpack.DefinePlugin( {
			'process.env': {
				NODE_ENV: '"production"',
			},
		} ),
	] );
}

module.exports = config;
