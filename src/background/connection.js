import { MESSAGES, PORT_NAME } from '../common/constants'

let connection

const handleIncomingMessage = async (cache, msg) => {
  if (msg === MESSAGES.GET_DATA) {
    const data = await cache.getCurrent()

    connection.postMessage(data)
  }
}

// Store
const handleConnect = (cache, port) => {
  if (port.name === PORT_NAME) {
    connection = port

    connection.onMessage.addListener(handleIncomingMessage.bind(cache))
  }
}

export default handleConnect
