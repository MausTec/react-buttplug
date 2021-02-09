import React from 'react'
import './index.css'

import {
  ButtplugProvider
} from '@maustec/react-buttplug'
import VibratorSearchButton from './VibratorSearchButton'
import VibratorControls from './VibratorControls'

const App = () => {
  return (
    <ButtplugProvider serverName={"buttplugs."}>
      <VibratorSearchButton />
      <VibratorControls />
    </ButtplugProvider>
  )
}

export default App
