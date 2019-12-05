import { loggingOption, onDemandOption } from '../common/storage'

/**
 * Addon options for:
 * - making requests on demand;
 * - logging;
 *
 * @type {import('../common/storage').options}
 */
export let options

/**
 * Selects a new input based on id and creates an attribute for it.
 * It also attaches an event which change the attribute in storage on select
 */
function bindInput (id, store) {
  const element = document.getElementById(id)

  // Save changes to storage
  element.addEventListener('input', ({ target: { checked } }) => {
    store.setData(checked)
  })
}

// Attach options to html inputs
const init = async () => {
  bindInput('requests-on-demand', onDemandOption)
  bindInput('logging-enabled', loggingOption)
}

// Load cached data and attach handlers when options.html page loads
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    init()
  }
}
