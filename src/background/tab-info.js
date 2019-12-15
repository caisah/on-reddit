const tabInfo = (tab, changeInfo) => {
  let newUrl = false
  let discarded = false

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
