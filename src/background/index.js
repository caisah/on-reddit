import { LOGGING, ON_DEMAND_REQESTS } from '../common/constants'
import handleConnect from './connection'
import logger from '../common/logger'
import OptionStorage from '../common/option-storage'
import cache from './cache'
import getTabInfo from './tab-info'
import badge from './badge'

const SRC = 'background'

const setBadge = async id => {
  logger.log('[set badge] Trying to set badge')
  const activeTabId = cache.getActiveTabId()

  if (id === activeTabId) {
    logger.log('[set badge] Setting')

    const data = await cache.get(id)
    badge.set(data)
  }
  logger.log('[set badge] Not set. Different active tab')
}

const handleTabActivation = async tab => {
  logger.log('[tab activation] Tab activated', tab)
  const { tabId } = tab

  cache.setActiveTabId(tabId)
  await cache.storeData(tab)
  setBadge(tabId)
}

const handleTabUpdate = async (id, changeInfo, tab) => {
  const tabInfo = getTabInfo(tab, changeInfo)
  const { discarded, active } = tabInfo

  // Delete cache when tab is discarded
  if (discarded) {
    cache.removeId(id)
    logger.log('[tab update] Tab discarded', id)
    return
  }

  // If tab becomes active, set it as active, cache data & set badge
  if (active) {
    cache.setActiveTabId(id)
    const { urlChanged, tabId, newUrl } = tabInfo

    if (urlChanged) {
      logger.log('[tab update] Url changed', tabId, newUrl)
      await cache.storeNewData(tabInfo)
    } else {
      logger.log('[tab update] Caching tab', tabId, tabInfo)
      await cache.storeData(tabInfo)
    }

    setBadge(id)
  }
}

const startup = async () => {
  // Option for toggling logging
  const loggingOption = new OptionStorage(LOGGING)

  // Option for making requests only when clicking the badge
  const requestsOnDemandOption = new OptionStorage(ON_DEMAND_REQESTS)

  // Get the initial values for the options from storage.local
  const [shouldLog, shouldRequestOnDemand] = await Promise.all([
    loggingOption.getValueAsync(),
    requestsOnDemandOption.getValueAsync()
  ])
  logger.log('should log', shouldLog)

  // Enforce logging option
  logger.toggleLogging(shouldLog, SRC)

  // Toggle logging if the value from storage.local changes
  loggingOption.subscribeToChanges(logger.toggleLogging, SRC)

  requestsOnDemandOption.subscribeToChanges(() => {
  })

  // Listen for the messages from the popup script
  browser.runtime.onConnect.addListener(handleConnect)
  browser.tabs.onUpdated.addListener(handleTabUpdate)
  browser.tabs.onActivated.addListener(handleTabActivation)
}

// When the extensions starts up
startup()
