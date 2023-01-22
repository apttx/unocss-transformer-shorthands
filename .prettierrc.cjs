/** @type {import('prettier').Config} */
module.exports = {
  useTabs: false,
  tabWidth: 2,
  arrowParens: 'always',
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  semi: false,
  plugins: [require('prettier-plugin-css-order')],
  pluginSearchDirs: ['.'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
  singleAttributePerLine: true,
}
