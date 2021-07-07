import multiInput from 'rollup-plugin-multi-input'
import importCss from 'rollup-plugin-styles'
import typescript from 'rollup-plugin-typescript2'

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: ['./src/**/*.ts', '!./src/**/*.stories.ts'],
  output: { dir: './dist/esm', format: 'esm' },
  plugins: [
    multiInput(),
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
