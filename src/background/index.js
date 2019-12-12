import { LOGGING, ON_DEMAND_REQESTS } from '../common/constants'
import ApiRequest from './request'
import handleConnect from './connection'
import logger from './logger'
import Option from './option'
import Cache from './cache'
import TabInfo from './tab-info'
import badge from './badge'

const handleTabActivation = (cache, { tabId }) => {
  logger.log('Activated tab', tabId)

  cache.setActiveId(tabId)
}

const handleTabUpdate = async (cache, id, changeInfo, tab) => {
  logger.log('Tab updated')

  const tabInfo = new TabInfo(tab, changeInfo)

  if (tabInfo.isActive()) {
    handleTabActivation(cache, { tabId: tabInfo.id })
  }

  if (!tabInfo.urlChanged()) {
    logger.log('Url did not change', tabInfo.url)
    return
  }

  if (!tabInfo.urlNotValid()) {
    logger.log('Tab url not valid', tabInfo.url)

    badge.setType(badge.types.error)
    return
  }

  const request = new ApiRequest(tabInfo)
  cache.add(request.execute())
  const entries = await cache.getCurrent()
  badge.setFromEntries(entries)
}

const startup = async () => {
  badge.setType(badge.types.initial)

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
