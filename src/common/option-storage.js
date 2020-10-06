import BasicStorage from './basic-storage'
import logger from './logger'

class OptionsStorage extends BasicStorage {
  subscribeToChanges (listener, ...args) {
    browser.storage.onChanged.addListener((changes, area) => {
      if (area === 'local') {
        for (const key in changes) {
          if (key === this.key) {
            const newValue = changes[key].newValue

            logger.log(`Storage changed ${key} ${newValue}`)
            listener(newValue, ...args)

            return
          }
        }
      }
    })
  }
}

export default OptionsStorage
