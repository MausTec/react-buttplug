import { useEffect } from 'react'
import { ButtplugClientDevice } from 'buttplug'
import PropTypes from 'prop-types'

/**
 *
 * @param children
 * @param device
 * @param vibrate
 * @returns {*}
 * @constructor
 */
const ButtplugDeviceController = ({ children, device, vibrate }) => {
  useEffect(() => {
    device && device.vibrate(vibrate)
  }, [device, vibrate])

  return children
}

ButtplugDeviceController.propTypes = {
  device: PropTypes.instanceOf(ButtplugClientDevice),
  vibrate: PropTypes.number,
  children: PropTypes.node
}

export default ButtplugDeviceController
