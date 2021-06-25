import css from 'rollup-plugin-import-css'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default {
  input: './src/index.bundle.ts',
  output: [
    { file: './dist/fusion-components.js', format: 'esm' },
    { file: './dist/fusion-components-min.js', format: 'esm', plugins: [terser()] },
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
    css(),
  ],
}
