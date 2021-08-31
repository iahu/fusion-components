import multiInput from 'rollup-plugin-multi-input'
import importCss from 'rollup-plugin-lit-css'
import typescript from 'rollup-plugin-typescript2'

const input = ['./src/**/*.ts', '!./src/**/*.stories.ts']
const isTest = process.env.NODE_ENV !== 'test'

if (isTest) {
  input.push('!./src/**/*.test.ts')
}
const exclude = input.filter(s => s.startsWith('!')).map(s => s.slice(1))

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input,
  output: { dir: './dist/esm', format: 'esm' },
  plugins: [
    multiInput(),
    typescript({
      tsconfig: './tsconfig.json',
      tsconfigOverride: { exclude, compilerOptions: { sourceMap: true } },
    }),
    importCss(),
  ],
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
