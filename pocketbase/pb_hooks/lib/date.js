/**
 * @param {Date} date
 * @param {number} n
 * @returns {Date}
 */
function addDays(date, n) {
  return new Date(date.getTime() + n * 24 * 60 * 60 * 1000);
}

/**
 * @param {Date} date
 * @returns {Date}
 */
function startOfDate(date) {
  return new Date(date.setUTCHours(0, 0, 0, 0));
}

/**
 * @param {Date} date
 * @returns {Date}
 */
function endOfDate(date) {
  return new Date(date.setUTCHours(23, 59, 59, 999));
}

/**
 * @param {Date} date
 * @returns {string}
 */
function formatPocketbaseDate(date) {
  return new Date(date).toISOString().replace('T', ' ');
}

/**
 * Formats a date for use in email templates
 * @param {Date} date
 * @param {string} locale
 * @returns {string}
 */
function formatDate(date, locale) {
  if (!date) return "";
  if (locale === 'de') {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

module.exports = {
  addDays,
  startOfDate,
  endOfDate,
  formatPocketbaseDate,
  formatDate,
};
