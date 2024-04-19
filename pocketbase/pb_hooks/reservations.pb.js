onRecordBeforeCreateRequest((e) => {
  var startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);
  const start = new Date(e.record.get("start").string().split(" ")[0]);
  const end = new Date(e.record.get("end").string().split(" ")[0]);
  if (start < startOfDay) {
    throw new BadRequestError("Start_before_today.");
  }
  if (end < startOfDay) {
    throw new BadRequestError("End_before_today.");
  }

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

onRecordAfterCreateRequest((e) => {
  const { record } = e;
  const to = $os.getenv("NOTIFY_EMAIL");
  if (!to) return;
  $app.dao().expandRecord(record, ["product", "user"], null);
  const productName = record.expandedOne("product").get("name");
  const productId = record.expandedOne("product").get("id");
  const userName = record.expandedOne("user").get("name");
  const userEmail = record.expandedOne("user").get("email");
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName,
    },
    to: [{ address: to }],
    subject: `Neue reservierung von ${userName}: ${productName}`,
    html: `Hi,<br>
    <br>
    Neue Reservierung:<br>
    <br>
    Gegenstand:<br>
    <a href="${
      $app.settings().meta.appUrl
    }/link/product/${productId}">${productName}</a><br>
    <br>
    Person:<br>
    ${userName} (${userEmail})<br>
    `,
  });
  $app.newMailClient().send(message);
}, "reservations");
