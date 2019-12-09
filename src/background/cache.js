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
}

export default Cache
