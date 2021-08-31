import path from 'path'
import fs from 'fs'
import { importMapsPlugin } from '@web/dev-server-import-maps'
import { defaultReporter } from '@web/test-runner'

const __dirname = path.resolve()
const dirs = fs.readdirSync(path.join(__dirname, 'src'))
const importMap = dirs
  .filter(fd => fs.statSync(path.join(__dirname, 'src', fd)).isDirectory)
  .reduce((map, dir) => {
    map[`/dist/esm/${dir}/style.css`] = '/dist/esm/mock/style.css.js'
    return map
  }, {})

export default {
  nodeResolve: true,
  reporters: [defaultReporter({ reportTestResults: true, reportTestProgress: true })],
  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            ...importMap,
            '/dist/esm/styles/global.css': '/dist/esm/mock/style.css.js',
          },
        },
      },
    }),
  ],
}
