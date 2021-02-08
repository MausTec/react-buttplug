const { loaderByName } = require('@craco/craco')
const { addBeforeLoader } = require('@craco/craco')

module.exports = {
  webpack: {
    configure: function(webpackConfig) {
      const wasmLoader = {
        test: /\.wasm$/,
        use: ['wasm-loader'],
        type: "javascript/auto"
      }

      addBeforeLoader(webpackConfig, loaderByName('file-loader'), wasmLoader);
      return webpackConfig;
    }
  }
}
