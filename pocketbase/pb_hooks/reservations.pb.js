/// <reference path="../pb_data/types.d.ts" />

onRecordBeforeCreateRequest((e) => {
  const { record, httpContext } = e;
  var startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);
  const start = new Date(record.get("start").string().split(" ")[0]);
  const end = new Date(record.get("end").string().split(" ")[0]);
  const isAdmin = httpContext.get("admin");
  const requireUser = $os.getenv("CONFIG_RESERVATION_REQUIRE_USER") !== "false";

  // Store location of product in reservation
  $app.dao().expandRecord(record, ["product"], null);
  const product = record.expandedOne("product");
  record.set("location", product.get("location"));

  // Don't allow reserving where start of end is before today
  if (start < startOfDay && !isAdmin) {
    throw new BadRequestError("Start_before_today.");
  }
  if (end < startOfDay && !isAdmin) {
    throw new BadRequestError("End_before_today.");
  }

  // Make sure the reservation is linekd to a user
  if (requireUser && !record.get("user") && !isAdmin) {
    throw new BadRequestError("User_not_defined.");
  }

  // Make sure there is no overlapping reservation for the same product in the
  // same timespan
  const records = $app
    .dao()
    .findRecordsByFilter(
      "reservations",
      "product = {:product} && start < {:end} && end > {:start}",
      null,
      1,
      0,
      {
        product: record.get("product"),
        start: record.get("start"),
        end: record.get("end"),
      }
    );
  if (records.length > 0) {
    throw new BadRequestError("Overlapping_reservation.");
  }

  // Strip html out of message field
  // https://stackoverflow.com/a/51208595
  record.set(
    "message",
    record.get("message").replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "")
  );
}, "reservations");

onRecordAfterCreateRequest((e) => {
  const isAdmin = e.httpContext.get("admin");
  if (isAdmin) {
    // Don't send notification when an admin created the reservation
    return;
  }

  // TODO: only send notification when the user creating the reservation, is
  // also the user involved in the reservation
  // https://pocketbase.io/docs/js-routing/#retrieving-the-current-auth-state

  const { record } = e;

  $app.dao().expandRecord(record, ["product", "user", "location"], null);

  // Retrieve e-mail addresses to send reservation notifications on from
  // location collection
  const location = record.expandedOne("location");
  const notifications = JSON.parse(location.get("notifications"));
  if (
    !notifications ||
    !Array.isArray(notifications) ||
    notifications.length < 1
  ) {
    return;
  }

  const product = record.expandedOne("product");
  const productName = product.get("name");
  const productId = product.get("id");

  const user = record.expandedOne("user");
  const userName = user.get("name");
  const userEmail = user.get("email");

  notifications.forEach((to) => {
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
    <br>
    Nachricht:<br>
    <blockquote>
    ${record.get("message").replace(/\n/g, "<br>")}<br>
    </blockquote>`,
    });
    $app.newMailClient().send(message);
  });
}, "reservations");
