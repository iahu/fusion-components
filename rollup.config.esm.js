import typescript from 'rollup-plugin-typescript2'
import multiInput from 'rollup-plugin-multi-input'
import litcss from 'rollup-plugin-lit-css'

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
    litcss(),
  ],
}
