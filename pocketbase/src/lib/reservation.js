function hasOverlappingReservations(record, allowSameDay) {
  // A cancelled reservation is allowed to have an overlap
  if (record.get('cancelled')) {
    return false;
  }
  // When allowing same day reservations the start of one reservation can be on
  // the same day as the end of another reservation
  const startEndComparison = allowSameDay ? "start < {:end} && end > {:start}" : "start <= {:end} && end >= {:start}";
  const records = $app
    .dao()
    .findRecordsByFilter(
      "reservations",
      record.get("id")
        ? `id != {:id} && product = {:product} && cancelled != true && ${startEndComparison}`
        : `product = {:product} && cancelled != true && ${startEndComparison}`,
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
