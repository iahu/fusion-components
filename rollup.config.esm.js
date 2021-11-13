import typescript from '@rollup/plugin-typescript'
import importCss from 'rollup-plugin-lit-css'
import multiInput from 'rollup-plugin-multi-input'
import { viteFinal } from './.storybook/main'

const external = viteFinal().optimizeDeps.exclude

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: ['./src/**/*.ts', '!./src/**/*.stories.ts', '!./src/**/*.test.ts'],
  output: { dir: './dist/esm', format: 'esm', sourcemap: true },
  plugins: [typescript({ tsconfig: './tsconfig.build.json' }), importCss(), multiInput()],
  external,
}
