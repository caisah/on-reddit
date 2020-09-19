import logger from './logger'
import { RESPONSE_TYPE } from '../common/constants'

const types = {
  [RESPONSE_TYPE.NOT_AVAILABLE]: {
    color: '#000000',
    text: 'N/A'
  },
  [RESPONSE_TYPE.ERROR]: {
    color: '#921756',
    text: 'Err'
  },
  [RESPONSE_TYPE.ENTRIES] (number) {
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
    const textAndColor = types[RESPONSE_TYPE.NOT_AVAILABLE]

    logger.log('[badge] No data. Setting', textAndColor)
    setTextAndColor(textAndColor)
    return
  }

  logger.log('[badge] Setting', data)
  switch (type) {
    case RESPONSE_TYPE.ENTRIES: {
      setTextAndColor(types[RESPONSE_TYPE.ENTRIES](data.entries.length))
      return
    }

    case RESPONSE_TYPE.ERROR:
    case RESPONSE_TYPE.NOT_AVAILABLE: {
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
