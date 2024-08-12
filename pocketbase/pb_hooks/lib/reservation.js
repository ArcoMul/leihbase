function hasOverlappingReservations(record) {
  const records = $app
    .dao()
    .findRecordsByFilter(
      "reservations",
      record.get("id")
        ? "id != {:id} && product = {:product} && start < {:end} && end > {:start}"
        : "product = {:product} && start < {:end} && end > {:start}",
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
