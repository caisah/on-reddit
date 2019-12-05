import DOMPurify from 'dompurify'
import successHtml from './templates/success'
import failHtml from './templates/fail'
import { PORT, MESSAGES } from '../common/constants'

const renderSuccess = data => {
  const main = document.getElementById('main')

  main.innerHTML = DOMPurify.sanitize(successHtml(data))
}

const renderFail = () => {
  const main = document.getElementById('main')

  main.innerHTML = failHtml
}

const connectAndRender = () => {
  // Connect to the background script through PORT
  const port = browser.runtime.connect({ name: PORT })

  // Listen to message from background script on PORT
  port.onMessage.addListener(data => {
    console.log('Received data from background', data)

    if (data) {
      renderSuccess(data)
    } else {
      renderFail()
    }
  })

  // Send the background script a GET_DATA message
  port.postMessage(MESSAGES.GET_DATA)
}

const renderPageOnLoad = () => {
  // When the popup is opened fetch data from the background script and display it
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Popup loaded')
    connectAndRender()
  })
}

export default renderPageOnLoad
