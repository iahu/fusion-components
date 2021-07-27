import resolve from '@rollup/plugin-node-resolve'
import importCss from 'rollup-plugin-styles'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: './src/index.bundle.ts',
  output: [
    { file: './dist/fusion-components.js', format: 'esm' },
    { file: './dist/fusion-components-min.js', format: 'esm', plugins: [terser()] },
    { file: './dist/fusion-components-iife.js', format: 'iife', plugins: [terser()], name: 'FCComponents' },
  ],
  plugins: [
    resolve(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: false,
        },
      },
    }),
    importCss(),
  ],
}
