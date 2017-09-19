export default class Status {
  static get LOADING() {
    return 'LOADING';
  }

  static get NO_URL() {
    return 'NO_URL';
  }

  static get FETCHING() {
    return 'FETCHING';
  }

  static get IDLE() {
    return 'IDLE';
  }

  static get ERROR() {
    return 'ERROR';
  }

  constructor() {
    this.text = this.IDLE;
  }

  set(text, details) {
    this.text = text;
    this.details = details;
  }
}
