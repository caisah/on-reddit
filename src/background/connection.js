import { MESSAGES, PORT_NAME } from '../common/constants'
import logger from './logger'

let connection

const handleIncomingMessage = async (cache, msg) => {
  if (msg === MESSAGES.GET_DATA) {
    const data = await cache.getCurrent()

    logger.log('Sending message to popup', data)

    connection.postMessage(data)
  }
}

// Store
const handleConnect = (cache, port) => {
  if (port.name === PORT_NAME) {
    logger.log('Initiating connection with popup script')

    connection = port

    connection.onMessage.addListener(handleIncomingMessage.bind(null, cache))
  }
}

export default handleConnect
