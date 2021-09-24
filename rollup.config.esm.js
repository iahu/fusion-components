import typescript from '@rollup/plugin-typescript'
import importCss from 'rollup-plugin-lit-css'
import multiInput from 'rollup-plugin-multi-input'

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: ['./src/**/*.ts', '!./src/**/*.stories.ts', '!./src/**/*.test.ts'],
  output: { dir: './dist/esm', format: 'esm', sourcemap: true },
  plugins: [typescript({ tsconfig: './tsconfig.build.json' }), importCss(), multiInput()],
  external: [
    'lit',
    'lit/decorators.js',
    'lit/directives/ref.js',
    'lit/directives/if-defined.js',
    'exp-calc',
    '@open-wc/testing',
    'sinon',
    'lodash-es',
  ],
}
