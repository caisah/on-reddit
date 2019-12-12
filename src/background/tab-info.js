class TabInfo {
  constructor (tab, changeInfo) {
    this.id = tab.id
    this.newUrl = changeInfo && changeInfo.url
    this.url = this.newUrl || tab.url
    this.active = tab.active
  }

  urlChanged () {
    return Boolean(this.newUrl)
  }

  urlNotValid () {
    return this.url.startsWith('http')
  }

  isActive () {
    return Boolean(this.active)
  }
}

export default TabInfo
