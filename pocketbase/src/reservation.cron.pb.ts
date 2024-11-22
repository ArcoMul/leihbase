/// <reference path="../pb_data/types.d.ts" />

cronAdd("reservation-reminder", "*/1 * * * *", () => {
  const { addDays, startOfDate, endOfDate } = require(`${__hooks}/lib/date.js`);
  const { isInOpeningHoursDay } = require(`${__hooks}/lib/openingHours.js`);

  const name = "reservation-reminder";
  console.log(`[${name}] start`);

  const locations = $app
    .dao()
    .findRecordsByFilter("location", "active = true", "", -1, 0);
  console.log(`[${name}] found ${locations.length} locations`);

  locations.forEach((location) => {
    const openingHours = JSON.parse(location.getString("opening_hours"));
    if (
      !isInOpeningHoursDay(
        openingHours,
        new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
      )
    ) {
      // Location is not open tomorrow
      console.log(
        `[${name}] location ${location.get("id")} is not open tomorrow`
      );
      return;
    }

    const startOfTomorrow = startOfDate(addDays(new Date(), 1));
    const endOfTomorrow = endOfDate(addDays(new Date(), 1));
    const reservations = $app
      .dao()
      .findRecordsByFilter(
        "reservations",
        `cancelled != true && location = {:location} && start >= {:startOfTomorrow} && start <= {:endOfTomorrow}`,
        null,
        100,
        0,
        {
          location: location.get("id"),
          startOfTomorrow,
          endOfTomorrow,
        }
      );

    console.log(`[${name}] found ${reservations.length} reservations`);

    reservations.forEach((r) => {
      console.log("Send start reminder for reservation", r.get("id"));
    });
  });
});
