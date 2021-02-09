import React from 'react'
import './index.css'

import {
  ButtplugProvider,
  ButtplugDeviceController,
  ButtplugDeviceContext
} from 'react-buttplug'

const App = () => {
  return (
    <ButtplugProvider
      logLevel={'warn'}
      serverName={'React-Buttplug Server'}
      clientName={'React-Buttplug Client'}
    >
      <main>
        <ButtplugDeviceContext.Consumer>
          {({ buttplugReady, startScanning }) =>
            buttplugReady ? (
              <a href={'#'} onClick={(e) => startScanning()}>
                Scan Bluetooth
              </a>
            ) : (
              <p>Initializing buttplug...</p>
            )
          }
        </ButtplugDeviceContext.Consumer>

        <ButtplugDeviceContext.Consumer>
          {({ devices }) =>
            devices.map((device) => (
              <ButtplugDeviceController device={device} vibrate={0}>
                <div>
                  {device.Name} ({device.Index})
                </div>
              </ButtplugDeviceController>
            ))
          }
        </ButtplugDeviceContext.Consumer>
      </main>
    </ButtplugProvider>
  )
}

export default App
