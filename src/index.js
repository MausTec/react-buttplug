import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  buttplugInit,
  activateConsoleLogger,
  ButtplugWebsocketConnectorOptions,
  ButtplugEmbeddedConnectorOptions,
  ButtplugClient
} from 'buttplug'

class ButtplugProvider extends Component {
  static propTypes = {
    logLevel: PropTypes.oneOf([
      'fatal',
      'error',
      'warn',
      'info',
      'debug',
      'trace'
    ]),
    clientName: PropTypes.string,
    serverName: PropTypes.string,
    children: PropTypes.func,
    onError: PropTypes.func,
    onConnect: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      buttplugReady: false,
      devices: []
    }

    this.client = null

    this.handleScanClick = this.handleScanClick.bind(this)
    this.handleEmbeddedConnect = this.handleEmbeddedConnect.bind(this)
    this.addDevice = this.addDevice.bind(this)
    this.removeDevice = this.removeDevice.bind(this)

    this.vibrateDevice = this.vibrateDevice.bind(this)
  }

  addDevice(device) {
    this.setState({
      devices: [...this.state.devices, device]
    })
  }

  removeDevice(device) {
    const devices = [...this.state.devices]
    this.setState({
      devices: devices.filter((d) => d.Index !== device.index)
    })
  }

  componentWillUnmount() {
    this.state.devices.forEach((device) => device.disconnect())
  }

  componentDidMount() {
    buttplugInit().then(() => {
      console.log('buttplug is ready.')

      this.client = new ButtplugClient(this.props.clientName)
      this.client.addListener('deviceadded', this.addDevice)
      this.client.addListener('deviceremoved', this.addDevice)

      const options = new ButtplugEmbeddedConnectorOptions()
      options.ServerName = this.props.serverName

      this.client
        .connect(options)
        .then(this.props.onConnect)
        .catch(this.props.onError)

      this.setState({ buttplugReady: true })

      if (this.props.logLevel) {
        activateConsoleLogger(this.props.logLevel)
      }
    })
  }

  handleScanClick(e) {
    e.preventDefault()

    this.client
      .startScanning()
      .then((data) => console.log('promise', data))
      .catch((error) => console.error('error', error))
  }

  handleEmbeddedConnect(e) {
    e.preventDefault()

    const options = new ButtplugEmbeddedConnectorOptions()
    options.ServerName = 'react-buttplug-server'

    this.client
      .connect(options)
      .then((data) => console.log('promise', data))
      .catch((error) => console.error('error', error))
  }

  vibrateDevice(device) {
    return (e) => {
      e.preventDefault()
      console.log(e.target.value)
      device
        .vibrate(parseFloat(e.target.value))
        .then(console.log)
        .catch(console.error)
    }
  }

  render() {
    if (!this.state.buttplugReady) {
      return <p>Waiting for buttplug...</p>
    } else {
      return (
        <div>
          <a href='#' onClick={this.handleScanClick}>
            scan bluetooth
          </a>
          <br />
          <ul>
            {this.state.devices.map((device) => (
              <li key={device.Index}>
                <div>
                  {device.Name} ({device.Index})
                </div>
                <input
                  type={'number'}
                  min={0}
                  max={1}
                  onChange={this.vibrateDevice(device)}
                  defaultValue={0}
                />
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }
}

export default ButtplugProvider
