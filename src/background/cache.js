import ApiRequest from './api-request'
import logger from './logger'

const store = {}

const storeRequest = async tabInfo => {
  const { tabId: id } = tabInfo
  const request = new ApiRequest(tabInfo)
  const data = await request.execute()

  store[id] = data

  logger.log('[cache] Set', id, data)

  return data
}

const getTabData = tabInfo => {
  const { tabId: id } = tabInfo

  if (store[id]) {
    logger.log('[cache] Already cached', id)

    return store[id]
  }

  logger.log('[cache] Setting tab', id)

  return storeRequest(tabInfo)
}

const getTabDataWithNewUrl = tabInfo => {
  logger.log('[cache] Resetting tab', tabInfo.id)

  return storeRequest(tabInfo)
}

const removeId = id => {
  delete this.store[id]
}

export default {
  getTabData,
  getTabDataWithNewUrl,
  removeId
}
