import html from './template';

const render = data => {
  const main = document.getElementById('main');
  console.log('---- render----', data);
  main.innerHTML = html(data);
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
