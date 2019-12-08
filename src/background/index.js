import { LOGGING, ON_DEMAND_REQESTS } from '../common/constants'
import ApiRequest from './request'
import handleConnect from './connection'
import logger from './logger'
import Option from './option'
import Cache from './cache'
import TabInfo from './tab-info'

const setBadge = text => {
  let color = '#84AC25'

  if (text === 'N/A') {
    color = '#000000'
  } else if (text === 'Err') {
    color = '#921756'
  } else if (text === 0) {
    color = '#6278A7'
  }

  browser.browserAction.setBadgeText({ text: text.toString() })
  browser.browserAction.setBadgeBackgroundColor({ color })
}

const handleTabUpdate = async (cache, id, changeInfo, tab) => {
  const tabInfo = new TabInfo(tab, changeInfo)

  if (!tabInfo.urlChanged()) {
    logger.log('Tab updated. Url did not change.')
    return
  }

  if (!tabInfo.urlNotValid()) {
    logger.log(`Tab url not valid ${tabInfo.url}`)
    setBadge('N/A')
    return
  }

  const request = new ApiRequest(tabInfo)

  cache.add(request.execute())
  // todo: set badge
}

const handleTabActivation = (cache, { id }) => {
  logger.log(`Activated tab: ${id}`)

  cache.setActiveId(id)
}

const init = () => {
  const loggingOption = new Option(LOGGING)
  const requestsOnDemandOption = new Option(ON_DEMAND_REQESTS)
  const cache = new Cache()

  loggingOption.subscribeToChanges(logger.toggleLogging)
  requestsOnDemandOption.subscribeToChanges(() => {
    logger.log('Changed requesting on demand')
  })

  // Listen for the messages from the popup script
  browser.runtime.onConnect.addListener(handleConnect.bind(cache))
  browser.tabs.onUpdated.addListener(handleTabUpdate.bind(cache))
  browser.tabs.onActivated.addListener(handleTabActivation.bind(cache))
}

// When the extensions starts up
browser.runtime.onStartup = () => {
  logger.log('Starting up')
  init()
}
