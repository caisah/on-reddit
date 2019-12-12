import logger from './logger'

class Cache {
  constructor () {
    this.store = {}
  }

  add (id, promise) {
    logger.log('Adding promise to cache', id)

    this.store[id] = promise
  }

  removeId (id) {
    this.store[id] = undefined
  }

  getCurrent () {
    logger.log('Getting active promise from cache', this.activeId)

    return this.store(this.activeId)
  }

  setActiveId (id) {
    logger.log('Setting active promise', id)

    this.activeId = id
  }
}

export default Cache
