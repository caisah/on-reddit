/* global getCurrentTabData */
/* eslint-disable no-unused-vars */
let connection;

const handleIncomingMessage = msg => {
  if (msg === 'data:get') {
    connection.postMessage(getCurrentTabData());
  }
};

const handleConnect = port => {
  if (port.name === 'on-reddit') {
    connection = port;

    connection.onMessage.addListener(handleIncomingMessage);
  }
};
/* eslint-enable no-unused-vars */
