/**
 * @typedef {import('../../common/constants').Response} Response
 */

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
        submitted ${entry.timeSinceSubmit} by
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
  </li>`

const submitBtn = url => `
<div class="submit-btn-container">
  <a href="https://www.reddit.com/submit?url=${url}">
    <button class="submit-btn">
      Post
    </button>
  </a>
</div>
`

/**
 * Returns the HTML for the popup based on data received.
 *
 * @param {Response} response - The response data from the background porcess.
 * @returns {HTMLElement}
 */
const html = ({ data }) => {
  if (data.entries && data.entries.length) {
    return `<ul class="container">${data.entries.map(row)}</ul>`
  }

  return submitBtn(data.url)
}

export default html
