import React, { Component } from 'react'
import * as wasm from 'buttplug/dist/module/buttplug-rs-ffi/buttplug_rs_ffi_bg.wasm'

import {
  buttplugInit,
  connectEmbedded,
  connectWebsocket,
  disconnect,
  startScanning,
  stopAllDevices,
  vibrate,
  rotate,
  linear,
  stopDevice,
  batteryLevel,
  rssiLevel,
  rawRead,
  rawWrite,
  rawSubscribe,
  rawUnsubscribe,
  createClientPtr,
  createDevicePtr,
  freeClientPtr,
  freeDevicePtr,
  activateConsoleLogger
} from 'buttplug'

class ButtplugProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buttplugReady: false
    }
  }

  componentDidMount() {
    buttplugInit().then(() => {
      console.log('buttplug is ready.', wasm)
      this.setState({ buttplugReady: true })
      if (this.props.logLevel) activateConsoleLogger(this.props.logLevel)
    })
  }

  render() {
    if (!this.state.buttplugReady) {
      return(<p>Waiting for buttplug...</p>)
    } else {
      return(<p>Buttplug is ready!</p>)
    }
  }
}

export default ButtplugProvider
