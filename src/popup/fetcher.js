import DOMPurify from 'dompurify'
import successHtml from './templates/success'
import failHtml from './templates/fail'
import notAvailableHtml from './templates/not-available'
import { PORT_NAME, MESSAGES, REQUEST_TYPES } from '../common/constants'

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
  [REQUEST_TYPES.ENTRIES]: renderSuccess,
  [REQUEST_TYPES.ERROR]: renderFail,
  [REQUEST_TYPES.NOT_AVAILABLE]: renderNotAvailable
}

const render = data => {
  console.log('on-reddit :: [popup] Received data from background', data)

  const main = document.getElementById('main')

  renderMap[data.type](main, data)
}

const connectToBackground = () => {
  // Connect to the background script through PORT_NAME
  const port = browser.runtime.connect({ name: PORT_NAME })

  // Listen to message from background script
  port.onMessage.addListener(render)

  return port
}

const init = () => {
  // When the popup is opened fetch data from the background script and display it
  document.addEventListener('DOMContentLoaded', () => {
    console.log('on-reddit :: [popup] Popup loaded')

    const port = connectToBackground()

    // Get data from the background script
    port.postMessage(MESSAGES.GET_DATA)
  })
}

export default init
