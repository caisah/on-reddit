import { storeData, getData } from './cache';
import { getKey, setKey, generateKey } from './key';
import TabData from './tab';
import { BASE_URL } from './constants';
import handleConnect from './connection';
import Status from './status';

const status = new Status();

const getDataForTab = tab =>
  new Promise(resolve => {
    const requestUrl = `${BASE_URL}${encodeURIComponent(tab.url)}`;

    fetch(requestUrl)
      .then(res => {
        if (res.status === 200) {
          res
            .json()
            .then(json => {
              console.log('---res---', json);
              status.set(Status.IDLE);
              resolve(new TabData(tab, json));
            })
            .catch(() => {
              status.set(Status.ERROR, 'Json parse');
              resolve(new TabData(tab));
            });
        } else {
          status.set(Status.ERROR, `Status code ${res.status}`);
          resolve(new TabData(tab));
        }
      })
      .catch(() => {
        status.set(Status.ERROR, 'Network');
        resolve(new TabData(tab));
      });
  });

const setBadge = text => {
  if (typeof text === 'number') {
    browser.browserAction.setBadgeText({ text: text.toString() });
    browser.browserAction.setBadgeBackgroundColor({ color: 'red' });
  } else {
    browser.browserAction.setBadgeText({ text });

    browser.browserAction.setBadgeBackgroundColor({ color: 'black' });
  }
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
      storeData(data);
      if (getKey() === key) {
        setBadge(data.entries.length);
      }

      console.log('---data---', data);
    })
    .catch(err => {
      setBadge('Err');
      console.log('--- handletabupdate err ---', err);
    });
};

const handleTabActivation = tab => {
  const key = generateKey(tab);
  const tabData = getData(key);

  if (tabData) {
    setBadge(tabData.entries.length);
  }
  setKey(key);
  console.log('---active tab---', tab);
};

const init = () => {
  browser.runtime.onConnect.addListener(handleConnect);
  browser.tabs.onUpdated.addListener(handleTabUpdate);
  browser.tabs.onActivated.addListener(handleTabActivation);
};

init();
