import { LOGGING, ON_DEMAND_REQESTS } from '../common/constants'
import ApiRequest from './api-request'
import handleConnect from './connection'
import logger from './logger'
import Option from './option'
import Cache from './cache'
import TabInfo from './tab-info'
import badge from './badge'

const updateCacheAndBadge = async (cache, tabInfo) => {
  const request = new ApiRequest(tabInfo)
  cache.add(request.execute())

  const data = await cache.getCurrent()
  badge.set(data)
}

const handleTabActivation = async (cache, tab) => {
  const { tabId } = tab
  logger.log('Tab activated', tabId)

  await updateCacheAndBadge(cache, tab)

  cache.setActiveId(tabId)
}

const createTabInfo = (tab, changeInfo) => {
  const tabInfo = new TabInfo(tab, changeInfo)

  logger.log('Created tab', tabInfo.tabId, tabInfo.url)

  return tabInfo
}

const handleTabUpdate = async (cache, id, changeInfo, tab) => {
  logger.log('Tab updated')

  const tabInfo = createTabInfo(tab, changeInfo)

  if (tabInfo.discarded) {
    cache.removeId(id)
    logger.log('Tab discarded', id)
    return
  }

  if (!tabInfo.newUrl) {
    logger.log('Url did not change', id)
    return
  }

  // This is executed when the url changes
  if (tabInfo.active) {
    logger.log('Activating tab on update')
    handleTabActivation(cache, tabInfo)
  }
}

const startup = async () => {
  // Object that holds all the data fetch promises
  const cache = new Cache()

  // Option for toggling logging
  const loggingOption = new Option(LOGGING)

  // Option for making requests only when clicking the popup or not
  const requestsOnDemandOption = new Option(ON_DEMAND_REQESTS)

  // Get the initial values for the options from storage.local
  const [shouldLog, shouldRequestOnDemand] = await Promise.resolve([
    loggingOption.getValueAsync(),
    requestsOnDemandOption.getValueAsync()
  ])

  // Enforce logging option
  logger.toggleLogging(shouldLog)

  // Toggle logging if the value from storage.local changes
  loggingOption.subscribeToChanges(logger.toggleLogging)

  requestsOnDemandOption.subscribeToChanges(() => {})

  // Listen for the messages from the popup script
  browser.runtime.onConnect.addListener(handleConnect.bind(null, cache))
  browser.tabs.onUpdated.addListener(handleTabUpdate.bind(null, cache))
  browser.tabs.onActivated.addListener(handleTabActivation.bind(null, cache))
}

// When the extensions starts up
startup()
