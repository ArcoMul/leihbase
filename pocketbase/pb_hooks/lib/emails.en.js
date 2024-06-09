module.exports = (function () {
  const lendingConditionsLink = $os.getenv("CONFIG_LENDING_CONDITIONS_LINK");
  const lendingContactEmail = $os.getenv("CONFIG_LENDING_CONTACT_EMAIL");

  function formatDate(date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  function formatCurrency(n) {
    return `€${Math.round(n)}`;
  }

  const reservationConfirmationEmail = ({
    userName,
    productUrl,
    productName,
    start,
    end,
    deposit,
  }) => ({
    subject: `Reservation confirmation of '${productName}'`,
    html: `Hi ${userName},<br>
<br>
We hereby confirm the reservation of the item
"<a href="${productUrl}">${productName}</a>"<br>
<br>
Your reservation runs from ${formatDate(start)} to ${formatDate(end)}.<br>
<br>
The item can be picked up at ${formatDate(start)}. If it is the first time that
you are borrowing something, we will ask you to sign the ${
      lendingConditionsLink
        ? `<a href="${lendingConditionsLink}">terms and conditions</a>`
        : "terms and conditions"
    }
of borrowing on site and to pay a ${
      deposit ? `${formatCurrency(deposit)} ` : ""
    } deposit.<br>
<br>
If you need to cancel your reservation, please send a short email${
      lendingContactEmail
        ? ` to <a href="${lendingContactEmail}">${lendingContactEmail}</a>`
        : ""
    }.<br>
<br>
We're happy that you have decided to borrow instead of buy!<br>
<br>
See you soon<br>
Your Leihbar`,
  });

  const reservationConfirmationLocationEmail = ({
    productUrl,
    productName,
    userName,
    userEmail,
    start,
    end,
    message,
  }) => ({
    subject: `New reservation by ${userName}: ${productName}`,
    html: `Hi,<br>
<br>
A new reservation by ${userName} (<a href="mailto:${userEmail}">${userEmail}</a>).<br>
<br>
<strong>Details</strong><br>
Item: <a href="${productUrl}">${productName}</a><br>
Start: ${formatDate(start)}<br>
End: ${formatDate(end)}<br>
${
  message
    ? `<br>
      ${userName} writes:<br>
      <blockquote>
        ${message.replace(/\n/g, "<br>")}<br>
        </blockquote>`
    : ""
}`,
  });

  return {
    reservationConfirmationEmail,
    reservationConfirmationLocationEmail,
  };
})();
