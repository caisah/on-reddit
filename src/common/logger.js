// const canLog = true
// const storedLogs = []
// const bufferMaxLen = 20
// let buffer = []

// const collectLogsFromBuffer = () => buffer.slice(0, bufferMaxLen).join()

// export const log = async text => {
//   if (canLog) {
//     const line = `${new Date().toTimeString()} - ${text}\n`

//     buffer = buffer.push(line)

//     if (buffer.length === bufferMaxLen) {
//       const data = await storedLogs.getValue()

//       storedLogs.setValue(data + collectLogsFromBuffer())
//       buffer = buffer.slice(bufferMaxLen)
//     }
//   }
// }

// export const getLogs = async () => {
//   const data = await storedLogs.getData()

//   return data + collectLogsFromBuffer()
// }

/**
 * The string prefixing logs.
 *
 * @typedef {string} LogPrefix
 **/

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
