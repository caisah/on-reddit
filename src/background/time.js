const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

const getTimeString = timestamp => {
  const time = Date.now() / 1000 - timestamp;
  const years = Math.floor(time / YEAR);
  if (years > 0) {
    return `${years} year/s ago`;
  }

  const months = Math.floor(time / MONTH);
  if (months > 0) {
    return `${months} month/s ago`;
  }

  const days = Math.floor(time / DAY);
  if (days > 0) {
    return `${days} day/s ago`;
  }

  const hours = Math.floor(time / HOUR);
  if (hours > 0) {
    return `${hours} hour/s ago`;
  }

  const minutes = Math.floor(time / MINUTE);
  if (minutes > 0) {
    return `${minutes} minute/s ago`;
  }

  return 'a few moments ago';
};

export default getTimeString;
