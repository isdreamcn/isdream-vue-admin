/*
 * @Description:
 * @Author: mtm
 * @Date: 2022-09-01 22:58:06
 * @LastEditTime: 2022-09-04 11:55:32
 * @LastEditors: mtm
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: { defineOptions: 'writable' },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],

  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    eqeqeq: 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/prefer-import-from-vue': 'off'
  }
}
