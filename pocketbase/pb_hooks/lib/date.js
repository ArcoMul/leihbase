function addDays(date, n) {
  return new Date(date.getTime() + n * 24 * 60 * 60 * 1000);
}

function startOfDate(date) {
  return new Date(date.setUTCHours(0, 0, 0, 0));
}

function endOfDate(date) {
  return new Date(date.setUTCHours(23, 59, 59, 999));
}

module.exports = {
  addDays,
  startOfDate,
  endOfDate,
};
