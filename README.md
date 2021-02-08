# react-buttplug

> React provider for Buttplug.io&#x27;s buttplug-js

[![NPM](https://img.shields.io/npm/v/react-buttplug.svg)](https://www.npmjs.com/package/react-buttplug) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-buttplug
```

Since `buttplug` requires a WASM blob, you'll need to add `wasm-loader` to Webpack if that's a thing you use.
If you're using `create-react-app`, check out `CRACO`:

`https://github.com/gsoft-inc/craco`

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'react-buttplug'
import 'react-buttplug/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

## License

MIT © [MausTec](https://github.com/MausTec)
