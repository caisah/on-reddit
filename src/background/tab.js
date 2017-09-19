import { generateKey } from './key';

export default class TabData {
  constructor(browserTab, jsonData = []) {
    this.tabId = browserTab.id;
    this.windowId = browserTab.windowId;
    this.entries = this.formatData(jsonData);
    this.key = generateKey(browserTab);
  }

  formatData(json) {
    if (json.data && json.data.children) {
      return json.data.children.map(child => ({
        subredditName: child.data.subreddit,
        subredditFullLink: `https://reddit.com/r/${child.data.subreddit}`,
        link: child.data.permalink,
        fullLink: `https://reddit.com${child.data.permalink}`,
        title: child.data.title,
        timestamp: child.data.created_utc,
        upvotes: child.data.ups,
      }));
    }

    return [];
  }
}
