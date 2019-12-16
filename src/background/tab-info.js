const tabInfo = (tab, changeInfo) => {
  let newUrl
  let discarded

  if (changeInfo) {
    newUrl = changeInfo.url
    discarded = changeInfo.discarded
  }

  return {
    discarded,
    urlChanged: Boolean(newUrl),
    tabId: tab.id,
    url: newUrl || tab.url,
    active: tab.active
  }
}

export default tabInfo
