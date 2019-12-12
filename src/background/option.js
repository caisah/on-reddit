import BasicStorage from '../common/storage'
import logger from './logger'

class Storage extends BasicStorage {
  subscribeToChanges (listener) {
    browser.storage.onChanged.addListener((changes, area) => {
      if (area === 'local') {
        for (const key in changes) {
          if (key === this.key) {
            const newValue = changes[key].newValue

            logger.log(`Storage changed ${key} ${newValue}`)
            listener(newValue)

            return
          }
        }
      }
    })
  }
}

export default Storage
