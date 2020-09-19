import { MESSAGES, PORT_NAME } from '../common/constants'
import logger from './logger'
import cache from './cache'

/**
 * @typedef {import('../common/constants').Port} Port
 */

/**
 * The connection port
 * @type {Port}
 */
let port

const handleIncomingMessage = async msg => {
  if (msg === MESSAGES.GET_DATA) {
    const data = await cache.get(cache.getActiveTabId())

    logger.log('[port] Sending message to popup', data)

    port.postMessage(data)
  }
}

/**
 * Stores a connection port and starts listening to messages from it.
 *
 * @param {Port} p - The connection port
 * @returns {void}
 */
const handleConnect = p => {
  if (p.name === PORT_NAME) {
    logger.log('[port] Initiating connection with popup script')

    port = p

    port.onMessage.addListener(handleIncomingMessage)
  }
}

export default handleConnect
