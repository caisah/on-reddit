import { onStorageChange } from '../common/storage';
import { storeData, getData } from './cache';
import { getKey, setKey, generateKey } from './key';
import TabData from './tab';
import { BASE_URL } from './constants';
import handleConnect from './connection';

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
            console.error('Json parse error:', err);
            setBadge('Err');

            return new TabData(tab, { err: 'json parse' });
          });
      } else {
        console.error('Status code error:', res.status);
        setBadge('Err');

        return new TabData(tab, { err: `status code ${res.status}` });
      }
    })
    .catch(err => {
      console.error('Network error:', err);
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
      console.error('Tab update error', err);
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
  browser.runtime.onConnect.addListener(handleConnect);
  browser.tabs.onUpdated.addListener(handleTabUpdate);
  browser.tabs.onActivated.addListener(handleTabActivation);

  onStorageChange(newOptions => {
    options = newOptions;
  });

  console.log(options);
};

init();
