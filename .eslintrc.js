module.exports = {
  root: true,
  env: {
    node: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential', // or plugin:vue/recommended for stricter rules
    'plugin:prettier/recommended' // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'prettier/prettier': 'off', // Disable Prettier errors
    'no-console': 'off', // Disable no-console errors
    'no-debugger': 'off', // Disable no-debugger errors
    'vue/no-unused-vars': 'off', // Disable no-
  }
}