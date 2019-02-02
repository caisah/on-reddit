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

/**
 * Handles an error when storage can't be read or written
 *
 * @param {Error} err
 */
const onError = err => {
  console.error(err);
};

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
    }, onError);
  });

/**
 * Store config OPTIONS to browser.storage.local
 *
 * @arg {Object} options - The options object
 * @arg {boolean} options.ON_DEMAND
 * @arg {boolean} options.LOGGING
 * @returns{promise}
 */
export const setStoredOptions = options =>
  browser.storage.local.set({ options });

export const onStorageChange = listener => {
  browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local') {
      listener(changes[OPTIONS].newValue);
    }
  });
};
