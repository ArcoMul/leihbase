module.exports = (function () {
  const lendingConditionsLink = $os.getenv("CONFIG_LENDING_CONDITIONS_LINK");
  const lendingContactEmail = $os.getenv("CONFIG_LENDING_CONTACT_EMAIL");

  function formatDate(date) {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  function formatCurrency(n) {
    return `${Math.round(n)}€`;
  }

  const reservationConfirmationEmail = ({
    userName,
    productUrl,
    productName,
    start,
    end,
    deposit,
  }) => ({
    subject: `Reservierungsbestätigung für ${productName}`,
    html: `Hi ${userName},<br>
<br>
hiermit bestätigen wir die Reservierung des Gegenstandes
"<a href="${productUrl}">${productName}</a>"<br>
<br>
Deine Reservierung läuft vom ${formatDate(start)} bis
zum ${formatDate(end)}.<br>
<br>
Der Gegenstand kann am ${formatDate(start)} abgeholt werden. Wenn es das erste
Mal ist, dass du etwas ausleihst, werden wir dich vor Ort bitten
${
  lendingConditionsLink
    ? `<a href="${lendingConditionsLink}">die Leihbedingungen</a>`
    : "die Leihbedingungen"
} zu unterschreiben und ${
      deposit ? `${formatCurrency(deposit)} ` : ""
    }Pfand zu hinterlegen.<br>
<br>
Solltest Du Deine Reservierung stornieren müssen, freuen wir 
uns über eine kurze Email${
      lendingContactEmail
        ? ` an
<a href="${lendingContactEmail}">${lendingContactEmail}</a>.`
        : "."
    }<br>
<br>
Wir freuen uns, dass du dich für Leihen statt Kaufen entscheidest!<br>
<br>
Bis bald<br>
Deine Leihbar`,
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
    subject: `Neue Reservierung von ${userName}: ${productName}`,
    html: `Hi,<br>
<br>
Eine neue Reservierung von ${userName}
(<a href="mailto:${userEmail}">${userEmail}</a>).<br>
<br>
<strong>Details</strong><br>
Gegenstand: <a href="${productUrl}">${productName}</a><br>
Beginn: ${formatDate(start)}<br>
Ende: ${formatDate(end)}<br>
${
  message
    ? `<br>
      ${userName} schreibt:<br>
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
