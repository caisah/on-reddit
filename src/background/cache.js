const cache = {};

export const storeData = tabData => {
  cache[tabData.key] = tabData;
};

export const getData = key => cache[key];
