import React, { useContext, useState } from 'react'
import { ButtplugDeviceContext } from '@maustec/react-buttplug'

const VibratorSearchButton = () => {
  const { buttplugReady, startScanning } = useContext(ButtplugDeviceContext)
  const [ pairing, setPairing ] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setPairing(true)
    startScanning()
      .then(msg => {
        setPairing(false)
        console.log(msg)
      })
      .catch(console.error)
  }

  if (pairing) {
    return (
      <p>Pairing with devices...</p>
    )
  } else if (buttplugReady) {
    return (
      <a onClick={handleClick} href='#'>Start Searching</a>
    )
  } else {
    return (
      <p>Waiting for Buttplugs...</p>
    )
  }
}

export default VibratorSearchButton
