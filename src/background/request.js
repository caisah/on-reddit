import logger from './logger'
import { REDDIT_API_URL, REQUEST_ERROR_TYPES } from './constants'

class Request {
  constructor (url, tab) {
    this.url = `${REDDIT_API_URL}${encodeURIComponent(tab.url)}`
    this.tab = tab
  }

  async execute () {
    try {
      const res = await fetch(this.url)

      if (res.status === 200) {
        try {
          return res.json()
        } catch (err) {
          logger.log(`Json parse error: ${err} for url ${this.url}`)

          return {
            type: REQUEST_ERROR_TYPES.JSON_PARSE,
            err
          }
        }
      } else {
        logger.log(`Status code error: ${res.status} for url ${this.url}`)

        return { type: REQUEST_ERROR_TYPES.STATUS_CODE, status: res.status }
      }
    } catch (err) {
      logger.log(`Network error: ${err} for url ${this.url}`)

      return { type: REQUEST_ERROR_TYPES.NETWORK, err }
    }
  }
}

export default Request
