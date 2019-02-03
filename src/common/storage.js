/**
 * Attribute for config OPTIONS
 *
 * @constant {string}
 */
export const ON_DEMAND = 'ON_DEMAND';

/**
 * Attribute for config OPTIONS
 *
 * @constant {string}
 */
export const LOGGING = 'LOGGING';

/**
 * Name of the object holding the addon options in browser.storage.local
 *
 * @constant {string}
 */
export const OPTIONS = 'options';

const LOGS = 'logs';

const defaultOptions = {
  LOGGING: false,
  ON_DEMAND: false,
};

/**
 * Get the options OPTIONS object from browser.storage.local
 *
 * @returns{promise}
 */
export const getStoredeOptions = () =>
  new Promise(resolve => {
    browser.storage.local.get(OPTIONS).then(stored => {
      const options = stored[OPTIONS] || defaultOptions;

      resolve(options);
    });
  });

/**
 * Store config OPTIONS to browser.storage.local
 *
 * @arg {Object} options - The options object
 * @arg {boolean} options.ON_DEMAND
 * @arg {boolean} options.LOGGING
 * @returns{promise}
 */
class StoredObj {
  constructor(key, initialValue) {
    this.key = key;
    this.initialValue = initialValue;
  }

  getData() {
    return new Promise(resolve => {
      browser.storage.local.get(this.key).then(
        stored => {
          resolve(stored[this.key] || this.initialValue);
        },
        () => {
          resolve(this.initialValue);
        },
      );
    });
  }

  setData(data) {
    browser.storage.local.set({ [this.key]: data });
  }

  onChange(listener) {
    browser.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes[this.key] && changes[this.key].newValue) {
        listener(changes[OPTIONS].newValue);
      }
    });
  }
}

export const storedOptions = new StoredObj(OPTIONS, defaultOptions);
export const storedLogs = new StoredObj(LOGS, '');
