const path = require('node:path')
const WebpackBarPlugin = require('webpackbar')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  target: 'node',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', 'json', '.tsx', '.ts'],
    alias: {
      'playwright-core': path.resolve(__dirname, './packages/utilities/shims/blankDependency.js'),
    },
  },
  plugins: [new WebpackBarPlugin()],
};
