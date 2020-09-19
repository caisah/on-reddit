/**
 * @typedef {Object} Port - Connection between contexts
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/Port
 *
 * @property {string} name
 * @property {Function} disconnect
 * @property {Object} error
 * @property {Object} onDisconnect
 * @property {Object} onMessage
 * @property {Function} postMessage
 * @property {Object} sender
 */

/**
 * @typedef {Object} Response - The response from the background script.
 *
 * @property {RESPONSE_TYPE} type - The type of the response.
 * @property {REQUEST_ERROR_TYPE} [errorType] - The error type if any.
 * @property {Object} [err] - The error if any.
 * @property {Object} [data] - The data object.
 */

/**
 * Attribute for config OPTIONS.
 * If requests are made on demand or not.
 *
 * @constant
 * @type {string}
 */
export const ON_DEMAND_REQESTS = 'ON_DEMAND_REQESTS'

/**
 * Attribute for config OPTIONS.
 * If logging is enabled or not.
 *
 * @constant
 * @type {string}
 */
export const LOGGING = 'LOGGING'

/**
 * @typedef {Object} OPTIONS - Options object
 * @property {boolean} ON_DEMAND_REQESTS
 * @property {boolean} LOGGING
 */

/**
 * Default addonoptions
 * @constant
 * @type {OPTIONS}
 */
export const DEFAULT_OPTIONS = {
  [ON_DEMAND_REQESTS]: false,
  [LOGGING]: false
}

/**
 * Attribute for config OPTIONS.
 * Actual logs.
 *
 * @constant
 * @type {string}
 */
export const LOGS = 'LOGS'

/**
 * Port used for communication between background and popup
 *
 * @constant
 * @type {string}
 */
export const PORT_NAME = 'on-reddit'

/**
 * @typedef {Object} MESSAGES
 * @property {string} GET_DATA - Message sent in order to get data from background script
 */

/**
 * Object holding the types of messages exchanged between background and popup
 *
 * @constant
 * @type {MESSAGES}
 */
export const MESSAGES = {
  GET_DATA: 'get:data'
}

/**
 * Enum for the response types.
 *
 * @readonly
 * @enum {string}
 */
export const RESPONSE_TYPE = {
  /* The response contains entries. */
  ENTRIES: 'entries',
  /* The response contains an error, so no entries. */
  ERROR: 'requestError',
  /* The response is not available because no request could be executed. */
  NOT_AVAILABLE: 'notAvailable'
}

/**
 * Enum for the error types {RESPONSE_TYPE.ERROR}
 *
 * @readonly
 * @enum {string}
 */
export const REQUEST_ERROR_TYPE = {
  /* The response could not be parsed. */
  JSON_PARSE: 'jsonParse',
  /* The server responded with a status code different than 2xx. */
  STATUS_CODE: 'statusCode',
  /* There was a network error. */
  NETWORK: 'network'
}
