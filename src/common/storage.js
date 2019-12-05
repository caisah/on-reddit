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


const LOGS = 'logs';

/**
 * Class managing storage to browser.storage.local
 */
class Storage {
  /**
   * @param {string} key - Key for the stored data
   * @param {any} initialValue - Initial value of the data being stored
   **/
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

  /**
   * @param {any} - Data to be set to browser.local.storage.local
   *
   * @returns {promise}
   */
  setValue(data) {
    this.value = data;
    return browser.storage.local.set({ [this.key]: data });
  }

  getValue() {
    return this.value;
  }
}

export const loggingOption = new Storage(LOGGING, false);
export const onDemandOption = new Storage(ON_DEMAND, false)
export const storedLogs = new Storage(LOGS, '');
