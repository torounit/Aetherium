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
  globals: {
    'wp': true,
    'workbox':true,
    'importScripts': true,
  }
}
