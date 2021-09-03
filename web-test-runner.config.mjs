import path from 'path'
import fs from 'fs'
import { importMapsPlugin } from '@web/dev-server-import-maps'
import { defaultReporter } from '@web/test-runner'

const __dirname = path.resolve()
const dist = '/test'
const importMap = { [`${dist}/styles/global.css`]: `${dist}/mock/style.css.js` }

fs.readdirSync(path.join(__dirname, 'src'))
  .filter(dir => fs.existsSync(path.join(__dirname, 'src', dir, 'style.css')))
  .forEach(dir => {
    importMap[`${dist}/${dir}/style.css`] = `${dist}/mock/style.css.js`
  })

export default {
  nodeResolve: true,
  reporters: [defaultReporter({ reportTestResults: true, reportTestProgress: true })],
  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: importMap,
        },
      },
    }),
  ],
}
