import { getKey } from './key';
import { getData } from './cache';

let connection;

const handleIncomingMessage = msg => {
  if (msg === 'data:get') {
    connection.postMessage(getData(getKey()));
  }
};

const handleConnect = port => {
  if (port.name === 'on-reddit') {
    connection = port;

    connection.onMessage.addListener(handleIncomingMessage);
  }
};

export default handleConnect;
