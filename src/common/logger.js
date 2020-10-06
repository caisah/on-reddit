const noLoggingFn = () => {}
const loggingBgFn = (...args) => {
  console.log(`on-reddit :: [${prefix}]`, ...args)
}

/**
 * The current function used for logging.
 **/
let log = noLoggingFn

/**
 * The script prefix for logging.
 * Can be either `popup` or `background`.
 *
 * @type {LogPrefix}
 **/
let prefix = ''

const logger = {
  get log () {
    return log
  },

  /**
   * Toggles on and of logging.
   *
   * @param {boolean} enableLogging - Flag used to control loggin
   * @param {LogPrefix} source - The log prefix.
   */
  toggleLogging (enableLogging, source) {
    log('Toggling logging', enableLogging)

    if (enableLogging) {
      prefix = source
      log = loggingBgFn
    } else {
      log = noLoggingFn
    }
  }
}

export default logger
