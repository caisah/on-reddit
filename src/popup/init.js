const render = data => {
  const main = document.getElementById('main');

  main.innerHTML = `<div>${JSON.stringify(data)}</div>`;
};

const connectAndFetchData = () =>
  new Promise(resolve => {
    const port = browser.runtime.connect({ name: 'on-reddit' });

    port.onMessage.addListener(msg => {
      resolve(msg);
    });
    port.postMessage('data:get');
  });

const init = () => {
  document.addEventListener('DOMContentLoaded', () => {
    connectAndFetchData()
      .then(render)
      .catch(err => {
        console.log('--err rendering---', err);
      });
  });
};

export default init;
