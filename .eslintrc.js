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
		"plugin:@wordpress/eslint-plugin/recommended",
		"plugin:@wordpress/eslint-plugin/esnext",
		'plugin:vue/essential'
	],
	globals: {
		'global': true,
		'wpApiSettings': true,
		'wp': true,
		'workbox': true,
		'importScripts': true,
	}
}
