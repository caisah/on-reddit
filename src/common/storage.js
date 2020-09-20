/**
 * Class managing storage to browser.storage.local
 */
class Storage {
  /**
   * @constructor
   * @param {string} key - Key for the stored data
   **/
  constructor (key) {
    this.key = key
  }

  /**
   * Returns a promise which resolves with the stored data
   *
   * @returns {Promise<any>}
   */
  getValueAsync () {
    return new Promise((resolve, reject) => {
      browser.storage.local.get(this.key).then(
        stored => {
          const data = stored[this.key]

          resolve(data)
        },
        err => {
          reject(err)
        }
      )
    })
  }

  /**
   * Stores data to local storage. On success resolves with the input data.
   *
   * @param {any} - Data to be set to browser.local.storage.local
   *
   * @returns {Promise<any>}
   */
  setValueAsync (data) {
    return new Promise((resolve, reject) => {
      browser.storage.local.set({ [this.key]: data }).then(
        () => {
          resolve(data)
        },
        err => {
          reject(err)
        }
      )
    })
  }
}

export default Storage
