import { getKey } from './key'
import { getData } from './cache'
import { MESSAGES } from '../common/constants'

let connection

const handleIncomingMessage = msg => {
  if (msg === MESSAGES.GET_DATA) {
    connection.postMessage(getData(getKey()))
  }
}

// Store
const handleConnect = port => {
  if (port.name === 'on-reddit') {
    connection = port

    connection.onMessage.addListener(handleIncomingMessage)
  }
}

export default handleConnect
