import ApiRequest from './api-request'
import logger from './logger'

const cache = {}
let activeTab

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
  delete this.store[id]
}

const setActiveTab = id => {
  logger.log('[cache] Setting current active tab', id)

  activeTab = id
}

const getActiveTab = id => {
  return activeTab
}

export default {
  get,
  storeData,
  storeNewData,
  setActiveTab,
  getActiveTab,
  removeId
}
