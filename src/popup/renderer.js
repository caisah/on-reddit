import DOMPurify from 'dompurify'
import successHtml from './templates/success'
import failHtml from './templates/fail'
import notAvailableHtml from './templates/not-available'
import { PORT_NAME, MESSAGES, RESPONSE_TYPE } from '../common/constants'

/**
 * @typedef {import('../common/constants').Port} Port
 */

const renderSuccess = (main, data) => {
  console.log('on-reddit :: [popup] Rendering: success')

  main.innerHTML = DOMPurify.sanitize(successHtml(data))
}

const renderFail = main => {
  console.log('on-reddit :: [popup] Rendering: fail page')

  main.innerHTML = failHtml()
}

const renderNotAvailable = main => {
  console.log('on-reddit :: [popup] Rendering: not available page')

  main.innerHTML = notAvailableHtml()
}

const renderMap = {
  [RESPONSE_TYPE.ENTRIES]: renderSuccess,
  [RESPONSE_TYPE.ERROR]: renderFail,
  [RESPONSE_TYPE.NOT_AVAILABLE]: renderNotAvailable
}

const render = data => {
  console.log('on-reddit :: [popup] Received data from background', data)

  const main = document.getElementById('main')

  renderMap[data.type](main, data)
}

/**
 * Connect to the background process (through PORT_NAME) & listen to messages from it.
 *
 * @returns {void}
 */
const init = () => {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('on-reddit :: [popup] Popup loaded')

    // Create port for communication
    const port = browser.runtime.connect({ name: PORT_NAME })

    port.onMessage.addListener(render)
    port.postMessage(MESSAGES.GET_DATA)
  })
}

export default init
