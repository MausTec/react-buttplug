import React, { useContext, useState } from 'react'
import {
  ButtplugDeviceContext,
  ButtplugDeviceController
} from '@maustec/react-buttplug'

const VibratorControls = () => {
  const { devices } = useContext(ButtplugDeviceContext)
  const [vibrateSpeed, setVibrateSpeed] = useState(0.0)

  const handleVibrateChange = (e) => {
    setVibrateSpeed(parseFloat(e.target.value))
  }

  if (devices.length === 0) {
    return null
  }

  return (
    <div>
      <input
        type='number'
        min='0'
        max='1'
        value={vibrateSpeed}
        onChange={handleVibrateChange}
      />

      <ul>
        {devices.map((device) => (
          <ButtplugDeviceController key={device.Index} device={device} vibrate={vibrateSpeed}>
            <li>{device.Name}</li>
          </ButtplugDeviceController>
        ))}
      </ul>
    </div>
  )
}

export default VibratorControls
