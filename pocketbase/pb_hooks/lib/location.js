function getNotificationEmailAddresses(locationRecord) {
  if (!locationRecord.get("notifications")) {
    return;
  }
  const notifications = JSON.parse(locationRecord.get("notifications"));
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
