This example was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It is linked to the react-buttplug package in the parent directory for development purposes.

You can run `yarn install` and then `yarn start` to test your package.

### About CRACO

This package uses `@craco/craco` to add rules to CRA's default Webpack config without ejecting.
Check out `craco.config.js` for this rule override, which is required for Webpack to properly
build the WASM file.

When overriding the default Webpack config with CRACO, **you must start your application using
`craco` instead of `react-scripts` to properly bootstrap the build system**. See `package.json`
for an example of this.
