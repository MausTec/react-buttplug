Components
----------

**src\index.js**

### 1. ButtplugProvider

Wrap your app in this and you'll be able to consume `ButtplugContext` wherever
you need control of buttplugs. Any methods of interest are available on the
context.

@example First, provide your App.
```
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

@example Then consume the context to create, for example, a connect button:
```
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

@example Finally, you can do things with the devices here:
```
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




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
logLevel|enum|no||Passing a &#x60;logLevel&#x60; here will enable Buttplug&#x27;s console logger.
clientName|string|no||This name will be passed to the ButtplugClient instance. It&#x27;s arbitrary.
serverName|string|no||This name will be passed to the embedded Buttplug Server. Also arbitrary.
children|node|no||The rest of your app goes here, now with 110% more ButtplugDeviceContext.
onError|func|no||Callback if you wish to handle Buttplug errors and rejections. Usually
receives a String-like thing.
onConnect|func|no||Callback will be execute when the client connects to its own server.
At this point, Buttplug will be truly ready, but you can also just
wait for &#x60;context.buttplugReady&#x60; to become true.
-----

<sub>This document was generated by the <a href="https://github.com/marborkowski/react-doc-generator" target="_blank">**React DOC Generator v1.2.5**</a>.</sub>
