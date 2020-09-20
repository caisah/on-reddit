import ApiRequest from './api-request'
import logger from '../common/logger'

const cache = {}
let activeTabId

const store = async tabInfo => {
  const { tabId: id } = tabInfo
  const request = new ApiRequest(tabInfo)
  const data = await request.execute()

  cache[id] = data

  logger.log('[cache] Set', id, data)

  return data
}

const storeData = tabInfo => {
  const { tabId: id } = tabInfo

  if (cache[id]) {
    logger.log('[cache] Already cached', id)

    return cache[id]
  }

  logger.log('[cache] Setting tab', id)

  return store(tabInfo)
}

const storeNewData = tabInfo => {
  logger.log('[cache] Resetting tab', tabInfo.id)

  return store(tabInfo)
}

const get = id => {
  logger.log('[cache] Geting current active tab', id)

  return cache[id]
}

const removeId = id => {
  delete cache[id]
}

const setActiveTabId = id => {
  logger.log('[cache] Setting current active tab', id)

  activeTabId = id
}

const getActiveTabId = id => {
  return activeTabId
}

export default {
  get,
  storeData,
  storeNewData,
  setActiveTabId,
  getActiveTabId,
  removeId
}
