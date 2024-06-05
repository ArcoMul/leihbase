const reservationConfirmationLocationEmail = ({
  productUrl,
  productName,
  userName,
  userEmail,
  start,
  end,
  message,
}) => `Hi,<br>
    <br>
    Eine neue Reservierung von ${userName} (<a href="mailto:${userEmail}">${userEmail}</a>).<br>
    <br>
    <strong>Details</strong><br>
    Gegenstand: <a href="${productUrl}">${productName}</a><br>
    Beginn: ${start.getDate()}.${
  start.getMonth() + 1
}.${start.getFullYear()}<br>
    Ende: ${end.getDate()}.${end.getMonth() + 1}.${end.getFullYear()}<br>
    <br>
    ${userName} schreibt:<br>
    ${
      message
        ? `<blockquote>
            ${message.replace(/\n/g, "<br>")}<br>
          </blockquote>`
        : `<i>Keine</i>`
    }`;

module.exports = {
  reservationConfirmationLocationEmail,
};
