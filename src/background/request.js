import logger from './logger'
import getTimeString from './time'
import { REDDIT_API_URL, REQUEST_ERROR_TYPES, REQUEST_TYPES } from './constants'

class Request {
  constructor (url, tab) {
    this.url = `${REDDIT_API_URL}${encodeURIComponent(tab.url)}`
    this.tab = tab
  }

  formatData (json) {
    if (json.data && json.data.children) {
      const entries = json.data.children.map(child => ({
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

      logger.log('Entries formatted', entries)

      return { type: REQUEST_TYPES.ENTRIES, entries }
    }

    logger.log('Entries not formatted', json)

    return json
  }

  async makeRequest () {
    try {
      const res = await fetch(this.url)

      if (res.status === 200) {
        try {
          return res.json()
        } catch (err) {
          logger.log(`Json parse error: ${err} for url ${this.url}`)

          return {
            type: REQUEST_TYPES.ERROR,
            subType: REQUEST_ERROR_TYPES.JSON_PARSE,
            err
          }
        }
      } else {
        logger.log(`Status code error: ${res.status} for url ${this.url}`)

        return { type: REQUEST_ERROR_TYPES.STATUS_CODE, status: res.status }
      }
    } catch (err) {
      logger.log(`Network error: ${err} for url ${this.url}`)

      return {
        type: REQUEST_TYPES.ERROR,
        subType: REQUEST_ERROR_TYPES.NETWORK,
        err
      }
    }
  }

  async execute () {
    const json = await this.makeRequest()

    return this.formatData(json)
  }
}

export default Request
