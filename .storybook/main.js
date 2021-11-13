const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.ts'],
  addons: ['@storybook/addon-links' /*, '@storybook/addon-essentials'*/],
  features: { postcss: false },
  // use vite
  core: { builder: 'storybook-builder-vite' },

  /**
   * viteFinal
   * @param {import('vite').UserConfig} config vite config
   */
  viteFinal(config) {
    config.optimizeDeps = {
      ...config.optimizeDeps,
      exclude: [/^lit/, 'exp-calc', '@open-wc/testing', 'sinon', 'lodash-es'],
    }

    return config
  },
}
