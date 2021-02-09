# react-buttplug

> React provider for Buttplug.io's `buttplug-ffi-js` library. Here there be WASM.

[![NPM](https://img.shields.io/npm/v/react-buttplug.svg)](https://www.npmjs.com/package/react-buttplug) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @maustec/react-buttplug
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

Wrap your app in this and you'll be able to consume `ButtplugContext` wherever
you need control of buttplugs. Any methods of interest are available on the
context.

### First, provide your App.
```jsx
import { ButtplugProvider } from '@maustec/react-buttplug'
import {
  VibratorSearchButton,
  VibratorControls
} from 'the-next-examples'

const App = () => {
  return (
    <ButtplugProvider serverName={"buttplugs."}>
      <VibratorSearchButton />
      <VibratorControls />
    </ButtplugProvider>
  )
}
```

### Then consume the context to create, for example, a connect button:

```jsx
import { useContext } from 'react'
import { ButtplugDeviceContext } from '@maustec/react-buttplug'

const VibratorSearchButton = () => {
  const { buttplugReady, startSearching } = useContext(ButtplugDeviceContext);

  const handleClick = (e) => {
    e.preventDefault();
    startSearching()
      .then(console.log)
      .catch(console.error)
   }

  if (buttplugReady) {
    return (
      <a onClick={handleClick} href='#'>Start Searching</a>
    )
  } else {
    return (
      <p>Waiting for Buttplugs...</p>
    )
  }
}
```

##E Finally, you can do things with the devices here:

```jsx
import { useContext, useState } from 'react'
import {
  ButtplugDeviceContext,
  ButtplugDeviceController
} from '@maustec/react-buttplug'

const VibratorControls = () => {
  const { devices } = useContext(ButtplugDeviceContext)
  const [ vibrateSpeed, setVibrateSpeed ] = useState(0.0);

  const handleVibrateChange = (e) => {
    setVibrateSpeed(parseFloat(e.target.value))
  }

  return (
    <div>
      <input type='number'
             min='0'
             max='1'
             value={ vibrateSpeed }
             onChange={ handleVibrateChange }
      />
    </div>

    <ul>
      { devices.map((device) => (
        <ButtplugDeviceController device={device} vibrate={vibrateSpeed}>
          <li>{ device.Name }</li>
        </ButtplugDeviceController>
      )) }
    </ul>
  )
}
```

## License

MIT © [MausTec](https://github.com/MausTec)
