class TabInfo {
  constructor (tab, changeInfo) {
    this.id = tab.id
    this.newUrl = changeInfo && changeInfo.url
    this.url = this.newUrl || tab.url
  }

  urlChanged () {
    return Boolean(this.newUrl)
  }

  urlNotValid () {
    return this.url.startsWith('http')
  }
}

export default TabInfo
