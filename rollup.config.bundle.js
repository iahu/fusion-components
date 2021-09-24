import resolve, { nodeResolve } from '@rollup/plugin-node-resolve'
import importCss from 'rollup-plugin-lit-css'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: './src/index.bundle.ts',
  output: [
    { file: './dist/fusion-components.js', format: 'esm', sourcemap: true },
    { file: './dist/fusion-components-min.js', format: 'esm', sourcemap: true, plugins: [terser()] },
    {
      file: './dist/fusion-components-iife.js',
      format: 'iife',
      sourcemap: true,
      plugins: [terser()],
      name: 'FCComponents',
    },
  ],
  plugins: [
    nodeResolve({ exportConditions: ['development'] }),
    resolve(),
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: false,
    }),
    importCss({ uglify: true }),
  ],
}
