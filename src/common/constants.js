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
 * @typedef {Object} OPTIONS - Options boject
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
