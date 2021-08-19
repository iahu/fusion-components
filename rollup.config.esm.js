import multiInput from 'rollup-plugin-multi-input'
import importCss from 'rollup-plugin-lit-css'
import typescript from 'rollup-plugin-typescript2'

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: ['./src/**/*.ts', '!./src/**/*.stories.ts'],
  output: { dir: './dist/esm', format: 'esm' },
  plugins: [multiInput(), typescript(), importCss()],
  external: [
    'lit',
    'lit/decorators.js',
    'lit/directives/ref.js',
    'lit/directives/if-defined.js',
    'exp-calc',
    '@open-wc/testing',
    'sinon',
  ],
}
