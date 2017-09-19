let key;

export const getKey = () => key;

export const setKey = newKey => {
  key = newKey;
};

export const generateKey = tab => {
  const windowId = tab.windowId;
  const tabId = tab.id || tab.tabId;

  return `${windowId}--${tabId}`;
};
