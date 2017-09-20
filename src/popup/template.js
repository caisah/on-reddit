const row = entry => `
  <li class="row">
    <div class="votes">${entry.score}</div>
    <div class="text">
      <p class="title">
        <a href="${entry.fullLink}">${entry.title}</a>
        <span class="domain">(${entry.urlDomain})</span>
      </p>
      <p class="tagline">
        submitted ${new Date(entry.timestamp).getDate()} by
        <a class="author" href="${entry.authorUrl}">
          ${entry.authorName}
        </a>
        to
        <a href="${entry.subredditFulllink}" class="subreddit">
          ${entry.subredditName}
        </a>
      </p>
      <p class="comments">
        <a href="${entry.fullLink}">${entry.commentsNumber} comments</a>
      </p>
    </div>
  </li>`;

const html = entries => {
  if (!entries.length) {
    return '<div>Not yet submitted</div>';
  }

  const htmlEntries = entries.map(row);

  return `<ul class="container">${htmlEntries}</ul>`;
};

export default html;
