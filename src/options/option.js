import BasicStorage from '../common/basic-storage'

class Option {
  constructor (storageKey, id, initialValue) {
    this.storage = new BasicStorage(storageKey)
    this.initialValue = initialValue
    this.element = document.getElementById(id)
  }

  async syncUiWithStore () {
    let checked

    try {
      checked = await this.storage.getValueAsync()
    } catch (err) {
      console.error(err)
    }
    this.element.checked = checked || this.initialValue
  }

  enableAutomaticSave () {
    this.element.addEventListener('input', ({ target: { checked } }) => {
      this.storage.setValueAsync(checked)
    })
  }

  doubleBind () {
    this.syncUiWithStore()
    this.enableAutomaticSave()
  }
}

export default Option
