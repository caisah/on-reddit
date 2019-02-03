import { storedLogs, storedOptions, LOGGING } from './storage';

const bufferMaxLen = 20;
let buffer = [];
let loggingEnabled = false;

const collectLogsFromBuffer = () => buffer.slice(0, bufferMaxLen).join();

export const log = async text => {
  if (loggingEnabled) {
    const line = `${new Date().toTimeString()} - ${text}\n`;

    buffer = buffer.push(line);

    if (buffer.length === bufferMaxLen) {
      const data = await storedLogs.getData();

      storedLogs.setData(data + collectLogsFromBuffer());
      buffer = buffer.slice(bufferMaxLen);
    }
  }
};

export const getLogs = async () => {
  const data = await storedLogs.getData();

  return data + collectLogsFromBuffer();
};

const init = () => {
  storedOptions.getData().then(options => {
    if (options[LOGGING]) {
      loggingEnabled = true;
    }
  });

  storedOptions.onChange(options => {
    // Clear stored logs when disabling logging
    if (options[LOGGING] === false) {
      storedLogs.setData('');
      buffer = [];
    }
    loggingEnabled = options[LOGGING];
  });
};

init();
