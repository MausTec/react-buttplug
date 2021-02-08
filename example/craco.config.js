const { loaderByName } = require('@craco/craco')
const { addBeforeLoader } = require('@craco/craco')

module.exports = {
  webpack: {
    configure: function(webpackConfig) {
      const wasmLoader = {
        test: /\.wasm$/,
        type: "webassembly/experimental"
      }

      addBeforeLoader(webpackConfig, loaderByName('file-loader'), wasmLoader);

      return webpackConfig;
    }
  }
}
