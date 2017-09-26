import { generateKey } from './key';
import getTimeString from './time';

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
        subredditName: `/r/${child.data.subreddit}`,
        subredditFullLink: `https://reddit.com/r/${child.data.subreddit}`,
        link: child.data.permalink,
        fullLink: `https://reddit.com${child.data.permalink}`,
        title: child.data.title,
        timeSinceSubmit: getTimeString(child.data.created_utc),
        score: child.data.score,
        urlDomain: child.data.domain,
        fullUrlDomain: `http://${child.data.domain}`,
        authorName: child.data.author,
        authorUrl: `https://reddit.com/u/${child.data.author}`,
        commentsNumber: child.data.num_comments,
      }));
    }

    return [];
  }
}
