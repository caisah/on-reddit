import logger from './logger'
import getTimeString from './time'
import { REQUEST_ERROR_TYPES, REQUEST_TYPES } from './constants'

export const REDDIT_API_URL = 'https://www.reddit.com/api/info.json?url='

class ApiRequest {
  constructor ({ url }) {
    this.url = `${REDDIT_API_URL}${encodeURIComponent(url)}`
    this.isValidUrl = url && url.startsWith('http')
  }

  formatData (requestData) {
    if (requestData.data) {
      const { children } = requestData.data

      const entries = children
        ? children.map(child => ({
            subredditName: `/r/${child.data.subreddit}`,
            subredditFullLink: `https://reddit.com/r/${child.data.subreddit}`,
            link: child.data.permalink,
            fullLink: `https://reddit.com${child.data.permalink}`,
            title: child.data.title,
            timeSinceSubmit: getTimeString(child.data.created_utc),
            score: child.data.score,
            urlDomain: child.data.domain,
            fullUrlDomain: `http://${child.data.domain}`,
            authorName: child.data.author,
            authorUrl: `https://reddit.com/u/${child.data.author}`,
            commentsNumber: child.data.num_comments
          }))
        : []

      logger.log('[request] Entries formatted', entries)

      return { type: REQUEST_TYPES.ENTRIES, entries }
    }

    logger.log('[request] No data to format', requestData)

    return requestData
  }

  async makeRequest () {
    if (!this.isValidUrl) {
      logger.log('[request] Url not valid. Not making the request')

      return {
        type: REQUEST_TYPES.NOT_AVAILABLE
      }
    }

    try {
      const res = await fetch(this.url)

      if (res.status === 200) {
        try {
          return res.json()
        } catch (err) {
          logger.log('[request] Json parse error', err, this.url)

          return {
            type: REQUEST_TYPES.ERROR,
            subType: REQUEST_ERROR_TYPES.JSON_PARSE,
            err
          }
        }
      } else {
        logger.log('[request] Status code error', res.status, this.url)

        return { type: REQUEST_ERROR_TYPES.STATUS_CODE, status: res.status }
      }
    } catch (err) {
      logger.log('[request] Network error', err, this.url)

      return {
        type: REQUEST_TYPES.ERROR,
        subType: REQUEST_ERROR_TYPES.NETWORK,
        err
      }
    }
  }

  async execute () {
    const requestData = await this.makeRequest()

    return this.formatData(requestData)
  }
}

export default ApiRequest
