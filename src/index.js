import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ButtplugDeviceContext, { defaultContext } from './ButtplugDeviceContext'
import ButtplugDeviceController from './ButtplugDeviceController'

import {
  buttplugInit,
  activateConsoleLogger,
  ButtplugEmbeddedConnectorOptions,
  ButtplugClient
} from 'buttplug'

/**
 * Wrap your app in this and you'll be able to consume `ButtplugContext` wherever
 * you need control of buttplugs. Any methods of interest are available on the
 * context.
 *
 * @example First, provide your App.
 * ```
 * import { ButtplugProvider } from '@maustec/react-buttplug'
 * import {
 *   VibratorSearchButton,
 *   VibratorControls
 * } from 'the-next-examples'
 *
 * const App = () => {
 *   return (
 *     <ButtplugProvider serverName={"buttplugs."}>
 *       <VibratorSearchButton />
 *       <VibratorControls />
 *     </ButtplugProvider>
 *   )
 * }
 * ```
 *
 * @example Then consume the context to create, for example, a connect button:
 * ```
 * import { useContext } from 'react'
 * import { ButtplugDeviceContext } from '@maustec/react-buttplug'
 *
 * const VibratorSearchButton = () => {
 *   const { buttplugReady, startSearching } = useContext(ButtplugDeviceContext);
 *
 *   const handleClick = (e) => {
 *     e.preventDefault();
 *     startSearching()
 *       .then(console.log)
 *       .catch(console.error)
 *    }
 *
 *   if (buttplugReady) {
 *     return (
 *       <a onClick={handleClick} href='#'>Start Searching</a>
 *     )
 *   } else {
 *     return (
 *       <p>Waiting for Buttplugs...</p>
 *     )
 *   }
 * }
 * ```
 *
 * @example Finally, you can do things with the devices here:
 * ```
 * import { useContext, useState } from 'react'
 * import {
 *   ButtplugDeviceContext,
 *   ButtplugDeviceController
 * } from '@maustec/react-buttplug'
 *
 * const VibratorControls = () => {
 *   const { devices } = useContext(ButtplugDeviceContext)
 *   const [ vibrateSpeed, setVibrateSpeed ] = useState(0.0);
 *
 *   const handleVibrateChange = (e) => {
 *     setVibrateSpeed(parseFloat(e.target.value))
 *   }
 *
 *   return (
 *     <div>
 *       <input type='number'
 *              min='0'
 *              max='1'
 *              value={ vibrateSpeed }
 *              onChange={ handleVibrateChange }
 *       />
 *     </div>
 *
 *     <ul>
 *       { devices.map((device) => (
 *         <ButtplugDeviceController device={device} vibrate={vibrateSpeed}>
 *           <li>{ device.Name }</li>
 *         </ButtplugDeviceController>
 *       )) }
 *     </ul>
 *   )
 * }
 * ```
 */
class ButtplugProvider extends Component {
  static propTypes = {
    /**
     * Passing a `logLevel` here will enable Buttplug's console logger.
     */
    logLevel: PropTypes.oneOf(['error', 'warn', 'info', 'debug', 'trace']),

    /**
     * This name will be passed to the ButtplugClient instance. It's arbitrary.
     */
    clientName: PropTypes.string,

    /**
     * This name will be passed to the embedded Buttplug Server. Also arbitrary.
     */
    serverName: PropTypes.string,

    /**
     * The rest of your app goes here, now with 110% more ButtplugDeviceContext.
     */
    children: PropTypes.node,

    /**
     * Callback if you wish to handle Buttplug errors and rejections. Usually
     * receives a String-like thing.
     */
    onError: PropTypes.func,

    /**
     * Callback will be execute when the client connects to its own server.
     * At this point, Buttplug will be truly ready, but you can also just
     * wait for `context.buttplugReady` to become true.
     */
    onConnect: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      ...defaultContext
    }

    this.client = null

    this.addDevice = this.addDevice.bind(this)
    this.removeDevice = this.removeDevice.bind(this)
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
      this.client = new ButtplugClient(this.props.clientName)
      this.client.addListener('deviceadded', this.addDevice)
      this.client.addListener('deviceremoved', this.addDevice)

      const options = new ButtplugEmbeddedConnectorOptions()
      options.ServerName = this.props.serverName

      this.client
        .connect(options)
        .then(this.props.onConnect)
        .catch(this.props.onError)

      this.setState({
        buttplugReady: true,
        client: this.client,
        startScanning: this.client.startScanning
      })

      if (this.props.logLevel) {
        activateConsoleLogger(this.props.logLevel)
      }
    })
  }

  render() {
    return (
      <ButtplugDeviceContext.Provider value={this.state}>
        {this.props.children}
      </ButtplugDeviceContext.Provider>
    )
  }
}

export { ButtplugProvider, ButtplugDeviceContext, ButtplugDeviceController }
