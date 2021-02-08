import React from 'react'
import './index.css'

import ButtplugProvider from 'react-buttplug'

const App = () => {
  return (
    <main>
      <ButtplugProvider logLevel={'warn'} />
    </main>
  )
}

export default App
