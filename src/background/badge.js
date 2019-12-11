const types = {
  notAvailable: {
    color: '#000000',
    text: 'N/A'
  },
  error: {
    color: '#921756',
    text: 'Err'
  },
  initial: {
    color: '#6278A7',
    text: '0'
  },
  custom: text => ({
    color: '#6278A7',
    text: text.toString()
  })
}

const setType = ({ text, color }) => {
  browser.browserAction.setBadgeText({ text })
  browser.browserAction.setBadgeBackgroundColor({ color })
}

const setFromEntries = entries => {
  const text = entries.length

  setType(types.custom(text))
}

export default {
  types,
  setType,
  setFromEntries
}
