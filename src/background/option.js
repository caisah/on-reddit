import BasicStorage from '../common/storage'

class Storage extends BasicStorage {
  subscribeToChanges (listener) {
    browser.storage.local.onChanged.addListener((changes, area) => {
      if (area === 'local') {
        for (const key in changes) {
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
