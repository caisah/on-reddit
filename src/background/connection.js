import { MESSAGES, PORT_NAME } from '../common/constants'
import logger from './logger'
import cache from './cache'

let connection

const handleIncomingMessage = async msg => {
  if (msg === MESSAGES.GET_DATA) {
    const data = await cache.get(cache.getActiveTabId())

    logger.log('[connection] Sending message to popup', data)

    connection.postMessage(data)
  }
}

// Store
const handleConnect = port => {
  if (port.name === PORT_NAME) {
    logger.log('[connection] Initiating connection with popup script')

    connection = port

    connection.onMessage.addListener(handleIncomingMessage)
  }
}

export default handleConnect
