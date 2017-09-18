/* global STATUS, BASE_URL ERRORS Status, TabData, handleConnect */
const status = new Status();
const cache = {};
let currentKey;

const getInfoKey = tab => `${tab.windowId}--${tab.tabId}`;

const shouldFetch = (tab, changeInfo, key) =>
  changeInfo.url && tab.url.startsWith('http') && !cache[key];

const storeData = data => {
  cache[getInfoKey(data)] = data;
};

const getDataForTab = tab =>
  new Promise(resolve => {
    status.set(Status.FETCHING);
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
  const key = `${tab.windowId}--${tab.id}`;

  if (shouldFetch(tab, changeInfo, key)) {
    getDataForTab(tab)
      .then(data => {
        storeData(data);
        if (currentKey === key) {
          setBadge(data.entries.length);
        }

        console.log('---data---', data);
      })
      .catch(err => {
        status.set(Status.ERROR);
        setBadge('N/A');
        console.log('--- handletabupdate err ---', err);
      });
  }
  console.log('--- handletabupdate  ---', changeInfo);
};

const handleTabActivation = tab => {
  const key = getInfoKey(tab);

  if (cache[key]) {
    setBadge(cache[key].entries.length);
  }
  currentKey = key;
  console.log('---active tab---', tab);
};

const getCurrentTabData = () => {
  return cache[currentKey];
};

const init = () => {
  browser.runtime.onConnect.addListener(handleConnect);
  browser.tabs.onUpdated.addListener(handleTabUpdate);
  browser.tabs.onActivated.addListener(handleTabActivation);
};

init();
