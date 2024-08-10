/// <reference path="../pb_data/types.d.ts" />

onRecordBeforeCreateRequest((e) => {
  const { record, httpContext } = e;
  var startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);
  const start = new Date(record.get("start").string().split(" ")[0]);
  const end = new Date(record.get("end").string().split(" ")[0]);
  const isAdmin = httpContext.get("admin");
  const requestUser = httpContext.get("authRecord");
  const requireUser = $os.getenv("CONFIG_RESERVATION_REQUIRE_USER") !== "false";

  // Store location of product in reservation
  $app.dao().expandRecord(record, ["product"], null);
  const product = record.expandedOne("product");
  $app.dao().expandRecord(product, ["location"], null);
  const location = product.expandedOne("location");
  const isLocationUser = location.get("users").includes(requestUser.get("id"));
  record.set("location", product.get("location"));

  // Don't allow reserving where start of end is before today
  // Except if the user is an admin or a location user
  if (start < startOfDay && !isAdmin && !isLocationUser) {
    throw new BadRequestError("Start_before_today.");
  }
  if (end < startOfDay && !isAdmin && !isLocationUser) {
    throw new BadRequestError("End_before_today.");
  }

  // Make sure the reservation is linked to a user
  if (requireUser && !record.get("user") && !isAdmin && !isLocationUser) {
    throw new BadRequestError("User_not_defined.");
  }

  // If send_confirmation isn't set yet, make sure to set it to false for admin
  // or location users, so that no confirmations are send when creating
  // reservations from the admin section or pocketbase interface
  if (!record.get("send_confirmation") && (isAdmin || isLocationUser)) {
    record.set("send_confirmation", false);
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
  const locale = $os.getenv("CONFIG_LOCALE") || "en";
  const { getNotificationEmailAddresses } = require(`${__hooks}/lib/location`);
  const {
    reservationConfirmationEmail,
    reservationConfirmationLocationEmail,
  } = require(`${__hooks}/lib/emails.${locale}`);

  const { record, httpContext } = e;

  const requestUser = httpContext.get("authRecord");
  $app.dao().expandRecord(record, ["location"], null);
  const location = record.expandedOne("location");

  if (!record.get("send_confirmation")) {
    // Prevent sending notifications if the reservation has been marked to not
    // send those
    return;
  }

  // TODO: only send notification when the user creating the reservation, is
  // also the user involved in the reservation
  // https://pocketbase.io/docs/js-routing/#retrieving-the-current-auth-state

  $app.dao().expandRecord(record, ["product", "user"], null);

  const product = record.expandedOne("product");
  const productName = product.get("name");

  const user = record.expandedOne("user");

  if (!user) {
    // Don't send a confirmation if no user is defined
    return;
  }

  const userName = user.get("name");

  const start = new Date(record.get("start").string().split(" ")[0]);
  const end = new Date(record.get("end").string().split(" ")[0]);

  // Notify location
  const notificationEmailAddresses = getNotificationEmailAddresses(location);
  if (notificationEmailAddresses.length > 0) {
    notificationEmailAddresses.forEach((to) => {
      const email = new MailerMessage({
        from: {
          address: $app.settings().meta.senderAddress,
          name: $app.settings().meta.senderName,
        },
        to: [{ address: to }],
        ...reservationConfirmationLocationEmail({
          productUrl: `${
            $app.settings().meta.appUrl
          }/link/product/${product.get("id")}`,
          productName,
          userName,
          userEmail: user.get("email"),
          start,
          end,
          message: record.get("message"),
        }),
      });
      $app.newMailClient().send(email);
    });
  }

  // Notify user, if the user is the one making the reservation
  if (user && requestUser && requestUser.get("id") === user.get("id")) {
    const email = new MailerMessage({
      from: {
        address: $app.settings().meta.senderAddress,
        name: $app.settings().meta.senderName,
      },
      to: [{ address: user.get("email") }],
      ...reservationConfirmationEmail({
        productUrl: `${$app.settings().meta.appUrl}/link/product/${product.get(
          "id"
        )}`,
        productName,
        userName,
        start,
        end,
        deposit: product.get("deposit"),
      }),
    });
    $app.newMailClient().send(email);
  }
}, "reservations");
