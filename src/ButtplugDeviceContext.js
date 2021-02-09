import { createContext } from 'react'

const noinit = () => {
  console.error('Context function called before buttplugReady state is true.')
}

/**
 * Default Context (this will be exposed when you consume).
 */
const defaultContext = {
  /**
   * An array of `ButtplugDevice` instances.
   */
  devices: [],

  /**
   * Flag indicating whether Buttplug is ready. You should wait until this is
   * true before using any buttplug-y functions.
   */
  buttplugReady: false,

  /**
   * This is the direct handle to your Buttplug client. If you like it raw,
   * uh, here you go.
   */
  client: null,

  /**
   * Call this to start scanning. You can also call `client.startScanning`
   * I GUESS, but this has a handy default error screem when you call it before
   * the Buttplug warms up.
   */
  startScanning: noinit
}

/**
 * This is a context provider! It's very modern-React-things-y and requires
 * React 16, I think. It's the backbone of this whole library, honestly.
 * You probably could've written this all yourself but that's doin' stuff.
 * Don't worry. I got you. Vibe on.
 */
const ButtplugDeviceContext = createContext(defaultContext)

export { defaultContext }
export default ButtplugDeviceContext
