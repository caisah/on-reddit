import logger from './logger'
import { REQUEST_TYPES } from '../common/constants'

const types = {
  [REQUEST_TYPES.NOT_AVAILABLE]: {
    color: '#000000',
    text: 'N/A'
  },
  [REQUEST_TYPES.ERROR]: {
    color: '#921756',
    text: 'Err'
  },
  [REQUEST_TYPES.ENTRIES] (number) {
    return {
      color: '#6278A7',
      text: number.toString()
    }
  }
}

const setTextAndColor = ({ text, color }) => {
  browser.browserAction.setBadgeText({ text })
  browser.browserAction.setBadgeBackgroundColor({ color })
  browser.browserAction.setBadgeTextColor({ color: '#ffffff' })
}

const set = ({ data, type }) => {
  if (!data) {
    const textAndColor = types[REQUEST_TYPES.NOT_AVAILABLE]

    logger.log('[badge] No data. Setting', textAndColor)
    setTextAndColor(textAndColor)
    return
  }

  logger.log('[badge] Setting', data)
  switch (type) {
    case REQUEST_TYPES.ENTRIES: {
      setTextAndColor(types[REQUEST_TYPES.ENTRIES](data.entries.length))
      return
    }

    case REQUEST_TYPES.ERROR:
    case REQUEST_TYPES.NOT_AVAILABLE: {
      setTextAndColor(types[data.type])
      return
    }

    default: {
      logger.log('[badge] Not setting text and color. This must be an error.')
    }
  }
}

export default {
  set
}
