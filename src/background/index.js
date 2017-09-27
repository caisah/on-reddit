import { storeData, getData } from './cache';
import { getKey, setKey, generateKey } from './key';
import TabData from './tab';
import { BASE_URL } from './constants';
import handleConnect from './connection';

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
              resolve(new TabData(tab, json));
            })
            .catch(err => {
              console.log('---res---', err);
              setBadge('Err');
              resolve(new TabData(tab), { err: 'json parse' });
            });
        } else {
          console.log('---res---', res.status);
          setBadge('Err');
          resolve(new TabData(tab), { err: `status code ${res.status}` });
        }
      })
      .catch(err => {
        console.log('---res---', err);
        setBadge('Err');
        resolve(new TabData(tab), { err: 'network' });
      });
  });

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
