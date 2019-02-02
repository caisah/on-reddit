import {
  getStoredeOptions,
  setStoredOptions,
  ON_DEMAND,
  LOGGING,
} from '../common/storage';

/**
 * An object holding the addon options:
 *
 * @typedef {object} options
 * @property {boolean} ON_DEMAND
 *   When enabled addon does request only when clicking on icon
 * @property {boolean} LOGGING
 *   When enabled addon saves logs to storage
 */
let options;

/**
 * Selects a new input based on id and creates an attribute for it.
 * It also attaches an event which change the attribute in storage on select
 */
class Input {
  /**
   * @param {string} id - The CSS id element from options.html page
   * @param {string} attribute - One of the storage attributes:
   *        ON_DEMAND or LOGGING
   */
  constructor(id, attribute) {
    this.element = document.getElementById(id);
    this.attribute = attribute;

    // Save changes to storage when toggled and cache it afterwards
    this.element.addEventListener('input', ({ target: { checked } }) => {
      options[attribute] = checked;
      setStoredOptions(options);
    });
  }

  /**
   * Checks or unchecks the input based on the data from the flag
   *
   * @param {boolen} checked
   */
  check(checked) {
    this.element.checked = checked || false;
  }
}

// Select the inputs, get data from cache and update the UI according to the received data
const init = () => {
  const inputs = [
    new Input('requests-on-demand', ON_DEMAND),
    new Input('logging-enabled', LOGGING),
  ];

  // Load the options from storage and cache it into an 'options' object
  getStoredeOptions().then(storedOptions => {
    inputs.forEach(input => {
      input.check(storedOptions[input.attribute]);
    });
    options = storedOptions;
  });
};

// Load cached data and attach handlers when options.html page loads
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    init();
  }
};
