module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint'
	},
	env: {
		browser: true,
	},
	plugins: [
		'vue'
	],
	extends: [
		'wordpress',
		'plugin:vue/essential'
	],
	rules: {
		camelcase: [ 'error', { properties: 'never' } ],
	},
	globals: {
		'wpApiSettings': true,
		'wp': true,
		'workbox': true,
		'importScripts': true,
	}
}
