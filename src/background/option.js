import BasicStorage from '../common/storage'

class Storage extends BasicStorage {
  subscribeToChanges (listener) {
    browser.storage.local.onChanged.addListener((changes, area) => {
      if (area === 'local') {
        for (let key in changes) {
          if (key === this.key) {
            listener(changes[key].newValue)

            return
          }
        }
      }
    })
  }
}

export default Storage
