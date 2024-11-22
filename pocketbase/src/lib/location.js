function getNotificationEmailAddresses(locationRecord) {
  if (!locationRecord.getString("notifications")) {
    return [];
  }
  const notifications = JSON.parse(locationRecord.getString("notifications"));
  if (
    !notifications ||
    !Array.isArray(notifications) ||
    notifications.length < 1
  ) {
    return [];
  }
  return notifications;
}

module.exports = {
  getNotificationEmailAddresses,
};
