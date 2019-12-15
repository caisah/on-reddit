import { LOGGING, ON_DEMAND_REQESTS } from '../common/constants'
import handleConnect from './connection'
import logger from './logger'
import Option from './option'
import cache from './cache'
import getTabInfo from './tab-info'
import badge from './badge'

const cacheAndSetBadge = async (tab, method) => {
  if (cache.isBeingSet) {
    logger.log('[cache and set] In progress')
    return
  }

  const data = await method(tab)

  logger.log('[cache and set] Done', tab.tabId, data)
  badge.set(data)
}

const handleTabActivation = tab => {
  logger.log('[tab activation] Tab activated', tab)
  cacheAndSetBadge(tab, cache.getTabData)
}

const handleTabUpdate = async (id, changeInfo, tab) => {
  const tabInfo = getTabInfo(tab, changeInfo)

  if (tabInfo.discarded) {
    cache.removeId(id)
    logger.log('[tab update] Tab discarded', id)
    return
  }

  if (tabInfo.active) {
    if (tabInfo.urlChanged) {
      logger.log('[tab update] Url changed', tabInfo.newUrl)
      cacheAndSetBadge(tabInfo, cache.getTabDataWithNewUrl)
      return
    }

    logger.log('[tab update] Caching tab', tabInfo.tabId, tabInfo)
    cacheAndSetBadge(tabInfo, cache.getTabData)
  }
}

const startup = async () => {
  // Option for toggling logging
  const loggingOption = new Option(LOGGING)

  // Option for making requests only when clicking the badge
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
  browser.runtime.onConnect.addListener(handleConnect)
  browser.tabs.onUpdated.addListener(handleTabUpdate)
  browser.tabs.onActivated.addListener(handleTabActivation)
}

// When the extensions starts up
startup()
