onRecordBeforeCreateRequest((e) => {
  console.log(JSON.stringify(e.httpContext, null, 2));
  console.log(JSON.stringify(e.record, null, 2));

  const records = $app.dao().findRecordsByFilter(
    "public_reservations", // collection
    "product = {:product}", // filter
    "-id", // sort
    5, // limit
    0, // offset
    { product: e.record.product } // optional filter params
  );
  console.log(JSON.stringify(records, null, 2));
}, "reservations");
