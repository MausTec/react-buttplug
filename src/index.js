import React, { Component } from 'react'
import { buttplugInit } from 'buttplug'

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
