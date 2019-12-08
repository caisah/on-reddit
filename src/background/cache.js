import getTimeString from './time'
import { ENTRIES } from './constants'

class Cache {
  constructor () {
    this.store = {}
  }

  add (id, promise) {
    this.store[id] = promise
  }

  removeId (id) {
    this.store[id] = undefined
  }

  getCurrent () {
    return this.store(this.activeId)
  }

  setActiveId (id) {
    this.activeId = id
  }

  formatData (json) {
    if (json.data && json.data.children) {
      const data = json.data.children.map(child => ({
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

      return { type: ENTRIES, data }
    }

    return json
  }
}

export default Cache
