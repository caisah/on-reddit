const row = entry => `
  <li class="row">

    <div class="score">
      <div>⬆</div>
      <div>${entry.score}</div>
      <div>⬇</div>
    </div>

    <div class="title">
      <p>
        <a class="text-title" href="${entry.fullLink}">${entry.title}</a>
        &nbsp;<a class="text-domain text-regular" href="${entry.fullUrlDomain}">(${entry.urlDomain})</a>
      </p>
      <p class="text-regular">
        submitted on ${entry.timeSinceSubmit} by
        <a class="text-author text-link-regular" href="${entry.authorUrl}">
          ${entry.authorName}
        </a>
        to
        <a href="${entry.subredditFullLink}" class="text-link-regular">
          ${entry.subredditName}
        </a>
      </p>
      <p>
        <a class="text-link-comments" href="${entry.fullLink}">${entry.commentsNumber} comments</a>
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
