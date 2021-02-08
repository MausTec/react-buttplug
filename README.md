# react-buttplug

> React provider for Buttplug.io&#x27;s buttplug-js

[![NPM](https://img.shields.io/npm/v/react-buttplug.svg)](https://www.npmjs.com/package/react-buttplug) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-buttplug
```

Since `buttplug` requires a WASM blob, you'll need to tell Webpack to serve that up using the `file-loader` and set a type.
If you're using `create-react-app`, check out `CRACO`:

`https://github.com/gsoft-inc/craco`

You may also need some more heap space for Javascript to avoid taking Buttplug dry.

```
set NODE_OPTIONS=--max_old_space_size=4096
# or if you're normal and use unix-y things
export NODE_OPTIONS=--max_old_space_size=4096
```

Check out `example/` for a create-react-app setup that initializes Buttplug.

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
