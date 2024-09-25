function hasOverlappingReservations(record) {
  // A cancelled reservation is allowed to have an overlap
  if (record.get('cancelled')) {
    return false;
  }
  const records = $app
    .dao()
    .findRecordsByFilter(
      "reservations",
      record.get("id")
        ? "id != {:id} && product = {:product} && cancelled != true && start < {:end} && end > {:start}"
        : "product = {:product} && cancelled != true && start < {:end} && end > {:start}",
      null,
      1,
      0,
      {
        id: record.get("id"),
        product: record.get("product"),
        start: record.get("start"),
        end: record.get("end"),
      }
    );
  return records.length > 0;
}

module.exports = {
  hasOverlappingReservations,
};
