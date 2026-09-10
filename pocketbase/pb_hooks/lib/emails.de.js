module.exports = {
  reservation_confirmation: {
    subject: "Reservierungsbestätigung für {productName}",
    html: `Hi {userName},<br>
<br>
hiermit bestätigen wir die Reservierung des Gegenstandes "<a href="{productUrl}">{productName}</a>"<br>
<br>
Deine Reservierung läuft vom {start} bis zum {end}.<br>
<br>
Der Gegenstand kann am {start} abgeholt werden. Wenn es das erste Mal ist, dass du etwas ausleihst, werden wir dich vor Ort bitten {#if lendingConditionsLink}<a href="{lendingConditionsLink}">{/if}die Leihbedingungen{#if lendingConditionsLink}</a>{/if} zu unterschreiben und uns deinen Ausweis zum Abgleich zu zeigen.<br>
<br>
{#if deposit}Für die Ausleihe von '{productName}' wird ein Pfand von {deposit} verlangt. Bitte bringe den Betrag, wenn möglich, passend mit.<br><br>{/if}
Deine Reservierung stornieren oder die Leihfrist ändern kannst du in deiner <a href="{appUrl}/reservations">Reservierungsübersicht</a>.<br>
<br>
Wir freuen uns, dass du dich für Leihen statt Kaufen entscheidest!<br>
<br>
Bis bald<br>
Deine Leihbar`,
  },
  reservation_confirmation_location: {
    subject: "Neue Reservierung: {userName} - {productName}",
    html: `Hi,<br>
<br>
Eine neue Reservierung von {userName} (<a href="mailto:{userEmail}">{userEmail}</a>).<br>
<br>
<strong>Details</strong><br>
Gegenstand: <a href="{productUrl}">{productName}</a><br>
Beginn: {start}<br>
Ende: {end}<br>
{#if message}<br>{userName} schreibt:<br><blockquote>{message}<br></blockquote>{/if}`,
  },
  reservation_start_reminder: {
    subject: "Abholen des Gegenstands '{productName}'",
    html: `Hi {userName},<br>
<br>
du hast bei {locationName} den Gegenstand '{productName}' reserviert. Der Gegenstand liegt morgen ({start}) {#if startHour}zwischen {startHour} und {endHour}{/if} bereit. Bitte denke daran, deinen Gegenstand abzuholen.<br>
<br>
Falls du ihn nicht mehr benötigst, kannst du deine Reservierung in deiner <a href="{appUrl}/reservations">Reservierungsübersicht</a> stornieren.<br>
<br>
Danke, dass du dich für Leihen statt Kaufen entscheidest!<br>
<br>
Liebe Grüße<br>
Dein LeihBar-Team<br>`,
  },
  reservation_end_reminder: {
    subject: "Zurückbringen des Gegenstands '{productName}'",
    html: `Hi {userName},<br>
<br>
wir hoffen, mit dem Gegenstand {productName} hat alles gut funktioniert!<br>
Deine Leihfrist endet morgen ({end}), also bring uns den Gegenstand bitte zurück zur {locationName}.<br>
<br>
{#if startHour}{locationName} ist geöffnet von {startHour} bis {endHour}.<br><br>{/if}
Falls du den Gegenstand länger behalten möchtest, kannst du die Reservierung in deiner <a href="{appUrl}/reservations">Reservierungsübersicht</a> verlängern.<br>
<br>
Danke, und bis morgen!<br>
<br>
Liebe Grüße<br>
dein LeihBar-Team`,
  },
  cancellation_confirmation: {
    subject: "Stornierungsbestätigung für {productName}",
    html: `Hi {userName},<br>
<br>
hiermit bestätigen wir die Stornierung deiner Reservierung für den Gegenstand "<a href="{productUrl}">{productName}</a>".<br>
<br>
Danke fürs Weitergeben, der Gegenstand ist jetzt wieder verfügbar für andere Nachbar:innen!<br>
<br>
Gerne bis zum nächste Mal!<br>
<br>
Liebe Grüße<br>
Deine Leihbar`,
  },
  reservation_cancellation_location: {
    subject: "Stornierung: {userName} - {productName}",
    html: `Der Reservierung von {userName} (<a href="mailto:{userEmail}">{userEmail}</a>) für den Gegenstand {productName} ist storniert.<br>
<br>
<strong>Details</strong><br>
Gegenstand: <a href="{productUrl}">{productName}</a><br>
Beginn: {start}<br>
Ende: {end}`,
  },
};
