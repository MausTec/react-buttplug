import React, { Component } from 'react'

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
  activateConsoleLogger,
  ButtplugMessageSorter
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
      console.log('buttplug is ready.')
      this.setState({ buttplugReady: true })
      if (this.props.logLevel) {
        activateConsoleLogger(this.props.logLevel)
      }
    })
  }

  handleScanClick(e) {
    e.preventDefault()

    const s = new ButtplugMessageSorter()

    const p = createClientPtr((p) => {
      console.log('event', p)
    }, 'react-buttplug')

    console.log(p)
    startScanning(s, p)
      .then(console.log)
      .catch(console.error)
  }

  render() {
    if (!this.state.buttplugReady) {
      return(<p>Waiting for buttplug...</p>)
    } else {
      return(<p><a href={"#"} onClick={this.handleScanClick}>scan bluetooth</a></p>)
    }
  }
}

export default ButtplugProvider
