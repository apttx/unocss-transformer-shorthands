/** @type {import("rollup").RollupOptions} */
const config = {
  external: ['@unocss/core', 'css-tree', 'magic-string'],
  input: './package.mjs',
  output: [
    {
      name: 'unocss-transformer-shorthands.bundle.esm',
      format: 'esm',
      file: 'distribution/unocss-transformer-shorthands.mjs',
    },
    {
      name: 'unocss-transformer-shorthands.bundle.cjs',
      format: 'cjs',
      file: 'distribution/unocss-transformer-shorthands.cjs',
    },
  ],
}

export default config
