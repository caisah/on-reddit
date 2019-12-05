import { storeData, getData } from './cache';
import { getKey, setKey, generateKey } from './key';
import TabData from './tab';
import { BASE_URL } from './constants';
import handleConnect from './connection';
import { log } from '../common/logger';

let options;

const setBadge = text => {
  let color = '#84AC25';

  if (text === 'N/A') {
    color = '#000000';
  } else if (text === 'Err') {
    color = '#921756';
  } else if (text === 0) {
    color = '#6278A7';
  }

  browser.browserAction.setBadgeText({ text: text.toString() });
  browser.browserAction.setBadgeBackgroundColor({ color });
};

const getDataForTab = tab => {
  const requestUrl = `${BASE_URL}${encodeURIComponent(tab.url)}`;

  return fetch(requestUrl)
    .then(res => {
      if (res.status === 200) {
        return res
          .json()
          .then(json => new TabData(tab, json))
          .catch(err => {
            log(`Json parse error: ${err}`);
            setBadge('Err');

            return new TabData(tab, { err: 'json parse' });
          });
      } else {
        log(`Status code error: ${res.status}`);
        setBadge('Err');

        return new TabData(tab, { err: `status code ${res.status}` });
      }
    })
    .catch(err => {
      log(`Network error: ${err}`);
      setBadge('Err');

      return new TabData(tab, { err: 'network' });
    });
};

const handleTabUpdate = (tabId, changeInfo, tab) => {
  if (!changeInfo.url) {
    return;
  }

  if (!tab.url.startsWith('http')) {
    setBadge('N/A');
    return;
  }

  const key = generateKey(tab);

  getDataForTab(tab)
    .then(data => {
      if (data.err) {
        return setBadge('Err');
      }

      storeData(data);
      if (getKey() === key) {
        setBadge(data.entries.length);
      }
    })
    .catch(err => {
      setBadge('Err');
      log(`Tab update error: ${err}`);
    });
};

const handleTabActivation = tab => {
  const key = generateKey(tab);
  const tabData = getData(key);

  if (tabData) {
    setBadge(tabData.entries.length);
  }
  setKey(key);
};

const init = () => {
  // Listen for the messages from the content script
  browser.runtime.onConnect.addListener(handleConnect);
  browser.tabs.onUpdated.addListener(handleTabUpdate);
  browser.tabs.onActivated.addListener(handleTabActivation);

  log('hello');
  log('yeah');
};

init();
