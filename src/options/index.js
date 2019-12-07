import {
  DEFAULT_OPTIONS,
  ON_DEMAND_REQESTS,
  LOGGING
} from '../common/constants'
import Option from './option'

// Synchronize options with html inputs
const init = async () => {
  const options = [
    new Option(
      ON_DEMAND_REQESTS,
      'requests-on-demand',
      DEFAULT_OPTIONS.ON_DEMAND_REQESTS
    ),
    new Option(LOGGING, 'logging-enabled', DEFAULT_OPTIONS.LOGGING)
  ]

  options.forEach(option => option.doubleBind())
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    init()
  }
}
