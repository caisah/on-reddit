import { LOGGING, ON_DEMAND_REQESTS } from '../common/constants'
import ApiRequest from './request'
import handleConnect from './connection'
import logger from './logger'
import Option from './option'
import Cache from './cache'
import TabInfo from './tab-info'
import badge from './badge'

const handleTabUpdate = async (cache, id, changeInfo, tab) => {
  const tabInfo = new TabInfo(tab, changeInfo)

  if (!tabInfo.urlChanged()) {
    logger.log('Tab updated. Url did not change.')
    return
  }

  if (!tabInfo.urlNotValid()) {
    logger.log(`Tab updated. Tab url not valid ${tabInfo.url}`)

    badge.setType(badge.types.error)
    return
  }

  const request = new ApiRequest(tabInfo)
  cache.add(request.execute())
  const entries = await cache.getCurrent()
  badge.setFromEntries(entries)
}

const handleTabActivation = (cache, { id }) => {
  logger.log(`Activated tab: ${id}`)

  cache.setActiveId(id)
}

const startup = () => {
  logger.log('Started up')

  badge.setType(badge.types.initial)

  const loggingOption = new Option(LOGGING)
  const requestsOnDemandOption = new Option(ON_DEMAND_REQESTS)
  const cache = new Cache()

  loggingOption.subscribeToChanges(logger.toggleLogging)
  requestsOnDemandOption.subscribeToChanges(() => {
    logger.log('Changed requesting on demand')
  })

  // Listen for the messages from the popup script
  browser.runtime.onConnect.addListener(handleConnect.bind(null, cache))
  browser.tabs.onUpdated.addListener(handleTabUpdate.bind(null, cache))
  browser.tabs.onActivated.addListener(handleTabActivation.bind(null, cache))
}

// When the extensions starts up
startup()
