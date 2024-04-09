onRecordBeforeCreateRequest((e) => {
  const records = $app
    .dao()
    .findRecordsByFilter(
      "reservations",
      "product = {:product} && start <= {:end} && end >= {:start}",
      null,
      1,
      0,
      {
        product: e.record.get("product"),
        start: e.record.get("start"),
        end: e.record.get("end"),
      }
    );
  if (records.length > 0) {
    throw new BadRequestError("Overlapping_reservation.");
  }
}, "reservations");
