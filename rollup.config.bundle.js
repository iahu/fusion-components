import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import importCss from 'rollup-plugin-lit-css'
import { terser } from 'rollup-plugin-terser'

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
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: false,
    }),
    importCss({ uglify: true }),
  ],
}
