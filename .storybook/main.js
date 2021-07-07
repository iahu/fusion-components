const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.ts'],
  addons: ['@storybook/addon-links' /*, '@storybook/addon-essentials'*/],
  features: { postcss: false },

  webpackFinal: async (config) => {
    config.module.rules.push(
      {
        test: /\.ts$/,
        use: [{ loader: 'ts-loader', options: { configFile: require.resolve('../tsconfig.json') } }],
      },
      {
        test: /\.html$/,
        use: [{ loader: 'raw-loader', options: { esModule: false } }],
      }
    )

    const originalCssRuleIndex = config.module.rules.findIndex((rule) => rule.test.source === '\\.css$')
    config.module.rules.splice(originalCssRuleIndex, 1, {
      test: /\.css$/,
      use: [{ loader: 'css-loader', options: { esModule: false } }],
    })

    const webComponentsRule = config.module.rules.find(
      (rule) => rule.use && rule.use.options && rule.use.options.babelrc === false
    )

    webComponentsRule.test.push(new RegExp(`node_modules(\\/|\\\\)lit/src(.*)\\.js$`))

    return config
  },
}
