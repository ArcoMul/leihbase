module.exports = {
  reservation_confirmation: {
    subject: "Reservierungsbestätigung für {PRODUCT_NAME}",
    html: `Hi {USER_NAME},<br>
<br>
hiermit bestätigen wir die Reservierung des Gegenstandes "<a href="{PRODUCT_URL}">{PRODUCT_NAME}</a>"<br>
<br>
Deine Reservierung läuft vom {START} bis zum {END}.<br>
<br>
Der Gegenstand kann am {START} abgeholt werden. Wenn es das erste Mal ist, dass du etwas ausleihst, werden wir dich vor Ort bitten {#if LENDING_CONDITIONS_LINK}<a href="{LENDING_CONDITIONS_LINK}">{/if}die Leihbedingungen{#if LENDING_CONDITIONS_LINK}</a>{/if} zu unterschreiben und uns deinen Ausweis zum Abgleich zu zeigen.<br>
<br>
{#if DEPOSIT}Für die Ausleihe von '{PRODUCT_NAME}' wird ein Pfand von {DEPOSIT} verlangt. Bitte bringe den Betrag, wenn möglich, passend mit.<br><br>{/if}
Deine Reservierung stornieren oder die Leihfrist ändern kannst du in deiner <a href="{APP_URL}/reservations">Reservierungsübersicht</a>.<br>
<br>
Wir freuen uns, dass du dich für Leihen statt Kaufen entscheidest!<br>
<br>
Bis bald<br>
Deine Leihbar`,
  },
  reservation_confirmation_location: {
    subject: "Neue Reservierung: {USER_NAME} - {PRODUCT_NAME}",
    html: `Hi,<br>
<br>
Eine neue Reservierung von {USER_NAME} (<a href="mailto:{USER_EMAIL}">{USER_EMAIL}</a>).<br>
<br>
<strong>Details</strong><br>
Gegenstand: <a href="{PRODUCT_URL}">{PRODUCT_NAME}</a><br>
Beginn: {START}<br>
Ende: {END}<br>
{#if MESSAGE}<br>{USER_NAME} schreibt:<br><blockquote>{MESSAGE}<br></blockquote>{/if}`,
  },
  reservation_start_reminder: {
    subject: "Abholen des Gegenstands '{PRODUCT_NAME}'",
    html: `Hi {USER_NAME},<br>
<br>
du hast bei {LOCATION_NAME} den Gegenstand '{PRODUCT_NAME}' reserviert. Der Gegenstand liegt morgen ({START}) {#if START_HOUR}zwischen {START_HOUR} und {END_HOUR}{/if} bereit. Bitte denke daran, deinen Gegenstand abzuholen.<br>
<br>
Falls du ihn nicht mehr benötigst, kannst du deine Reservierung in deiner <a href="{APP_URL}/reservations">Reservierungsübersicht</a> stornieren.<br>
<br>
Danke, dass du dich für Leihen statt Kaufen entscheidest!<br>
<br>
Liebe Grüße<br>
Dein LeihBar-Team<br>`,
  },
  reservation_end_reminder: {
    subject: "Zurückbringen des Gegenstands '{PRODUCT_NAME}'",
    html: `Hi {USER_NAME},<br>
<br>
wir hoffen, mit dem Gegenstand {PRODUCT_NAME} hat alles gut funktioniert!<br>
Deine Leihfrist endet morgen ({END}), also bring uns den Gegenstand bitte zurück zur {LOCATION_NAME}.<br>
<br>
{#if START_HOUR}{LOCATION_NAME} ist geöffnet von {START_HOUR} bis {END_HOUR}.<br><br>{/if}
Falls du den Gegenstand länger behalten möchtest, kannst du die Reservierung in deiner <a href="{APP_URL}/reservations">Reservierungsübersicht</a> verlängern.<br>
<br>
Danke, und bis morgen!<br>
<br>
Liebe Grüße<br>
dein LeihBar-Team`,
  },
  cancellation_confirmation: {
    subject: "Stornierungsbestätigung für {PRODUCT_NAME}",
    html: `Hi {USER_NAME},<br>
<br>
hiermit bestätigen wir die Stornierung deiner Reservierung für den Gegenstand "<a href="{PRODUCT_URL}">{PRODUCT_NAME}</a>".<br>
<br>
Danke fürs Weitergeben, der Gegenstand ist jetzt wieder verfügbar für andere Nachbar:innen!<br>
<br>
Gerne bis zum nächste Mal!<br>
<br>
Liebe Grüße<br>
Deine Leihbar`,
  },
  reservation_cancellation_location: {
    subject: "Stornierung: {USER_NAME} - {PRODUCT_NAME}",
    html: `Der Reservierung von {USER_NAME} (<a href="mailto:{USER_EMAIL}">{USER_EMAIL}</a>) für den Gegenstand {PRODUCT_NAME} ist storniert.<br>
<br>
<strong>Details</strong><br>
Gegenstand: <a href="{PRODUCT_URL}">{PRODUCT_NAME}</a><br>
Beginn: {START}<br>
Ende: {END}`,
  },
};
