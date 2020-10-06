import DOMPurify from 'dompurify'
import successHtml from './templates/success'
import failHtml from './templates/fail'
import notAvailableHtml from './templates/not-available'
import { PORT_NAME, MESSAGES, RESPONSE_TYPE, LOGGING } from '../common/constants'
import OptionStorage from '../common/option-storage'
import logger from '../common/logger'

/**
 * @typedef {import('../common/constants').Port} Port
 * @typedef {import('../common/constants').Response} Response
 * @typedef {import('../common/constants').RESPONSE_TYPE} RESPONSE_TYPE
 */

/**
 * Renders the popup when there is available data for it.
 *
 * @param {HTMLElement} node - The html popup node where to render.
 * @param {Response} data - The response data from the background porcess.
 * @returns {void}
 */
const renderSuccess = (node, data) => {
  logger.log('on-reddit :: [popup] Rendering: success')

  node.innerHTML = DOMPurify.sanitize(successHtml(data))
}

/**
 * Renders the popup for the case when there was an error getting the data.
 *
 * @param {HTMLElement} node - The html popup node where to render.
 * @returns {void}
 */
const renderFail = node => {
  logger.log('on-reddit :: [popup] Rendering: fail page')

  node.innerHTML = failHtml()
}

/**
 * Renders the popup for the case when there is no data available.
 *
 * @param {HTMLElement} node - The html popup node where to render.
 * @returns {void}
 */
const renderNotAvailable = node => {
  logger.log('on-reddit :: [popup] Rendering: not available page')

  node.innerHTML = notAvailableHtml()
}

/**
 * Mapping between response type and render function.
 *
 */
const renderMap = {
  [RESPONSE_TYPE.ENTRIES]: renderSuccess,
  [RESPONSE_TYPE.ERROR]: renderFail,
  [RESPONSE_TYPE.NOT_AVAILABLE]: renderNotAvailable
}

/**
 * Renders a new popup version base on the response from the background process.
 *
 * @param {Response} response - The response from the background porcess.
 * @returns {void}
 */
const render = response => {
  logger.log('on-reddit :: [popup] Received data from background', response)

  const main = document.getElementById('main')

  renderMap[response.type](main, response)
}

/**
 * Connect to the background process (through the PORT_NAME) & listen to messages from it.
 *
 * @returns {void}
 */
const init = async () => {
  const loggingOption = new OptionStorage(LOGGING)
  const shouldLog = await loggingOption.getValueAsync()

  logger.toggleLogging(shouldLog, 'popup')

  logger.log('on-reddit :: [popup] Popup loaded')

  // Create port for communication
  const port = browser.runtime.connect({ name: PORT_NAME })

  port.onMessage.addListener(render)
  port.postMessage(MESSAGES.GET_DATA)
}

export default init
