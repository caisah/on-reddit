class TabInfo {
  constructor (tab, changeInfo) {
    this.tabId = tab.id
    this.newUrl = changeInfo && changeInfo.url
    this.url = this.newUrl || tab.url
    this.active = tab.active
    this.discarded = changeInfo && changeInfo.discarded
  }
}

export default TabInfo
