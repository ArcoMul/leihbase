module.exports = {
  reservation_confirmation: {
    subject: "Reservation confirmation of '{PRODUCT_NAME}'",
    html: `Hi {USER_NAME},<br>
<br>
We hereby confirm the reservation of the item
"<a href="{PRODUCT_URL}">{PRODUCT_NAME}</a>"<br>
<br>
Your reservation runs from {START} to {END}.<br>
<br>
The item can be picked up at {START}. If it is the first time that
you are borrowing something, we will ask you to sign the
{#if LENDING_CONDITIONS_LINK}<a href="{LENDING_CONDITIONS_LINK}">{/if}terms and conditions{#if LENDING_CONDITIONS_LINK}</a>{/if} of borrowing on site.<br>
<br>
{#if DEPOSIT}A deposit of {DEPOSIT} is required to borrow {PRODUCT_NAME}. Please bring the exact amount if possible.<br><br>{/if}
You can cancel your reservation or change the borrowing period in your <a href="{APP_URL}/reservations">reservation overview</a>.<br>
<br>
We're happy that you have decided to borrow instead of buy!<br>
<br>
See you soon<br>
Your Leihbar`,
  },
  reservation_confirmation_location: {
    subject: "New reservation: {USER_NAME} - {PRODUCT_NAME}",
    html: `Hi,<br>
<br>
A new reservation by {USER_NAME} (<a href="mailto:{USER_EMAIL}">{USER_EMAIL}</a>).<br>
<br>
<strong>Details</strong><br>
Item: <a href="{PRODUCT_URL}">{PRODUCT_NAME}</a><br>
Start: {START}<br>
End: {END}<br>
{#if MESSAGE}
<br>
{USER_NAME} writes:<br>
<blockquote>
{MESSAGE}<br>
</blockquote>
{/if}`,
  },
  reservation_start_reminder: {
    subject: "Pick-up of '{PRODUCT_NAME}'",
    html: `Hi {USER_NAME},<br>
<br>
you reserved a {PRODUCT_NAME} at {LOCATION_NAME}. The item can be picked up tomorrow ({START}) {#if START_HOUR}between {START_HOUR} and {END_HOUR}{/if}.<br>
If you no longer need it, you can cancel your reservation in your <a href="{APP_URL}/reservations">reservation overview</a>.<br>
<br>
Thank you that you choose for borrowing instead of buying!<br>
<br>
See you soon<br>
Your LeihBar<br>`,
  },
  reservation_end_reminder: {
    subject: "Return of '{PRODUCT_NAME}'",
    html: `Hi {USER_NAME},<br>
<br>
we hope everything worked out well with the item '{PRODUCT_NAME}'!
<br>
The borrow-period ends tomorrow ({END}), so we would like to remind you of returning it to {LOCATION_NAME}.<br>
<br>
{#if START_HOUR}{LOCATION_NAME} is tomorrow open from {START_HOUR} to {END_HOUR}.<br><br>{/if}
If you would like to keep the item for longer, you can extend the reservation in your <a href="{APP_URL}/reservations">reservation overview</a>.<br>
<br>
Thank you, and see you tomorrow!<br>
Your LeihBar-Team`,
  },
  cancellation_confirmation: {
    subject: "Cancellation confirmation for {PRODUCT_NAME}",
    html: `Hi {USER_NAME},<br>
<br>
We hereby confirm the cancellation of your reservation for the item "<a href="{PRODUCT_URL}">{PRODUCT_NAME}</a>".<br>
<br>
Thanks for sharing, the item is now available again for other neighbours!<br>
<br>
See you next time!<br>
<br>
Your Leihbar`,
  },
  reservation_cancellation_location: {
    subject: "Cancellation: {USER_NAME} - {PRODUCT_NAME}",
    html: `The reservation of {USER_NAME} (<a href="mailto:{USER_EMAIL}">{USER_EMAIL}</a>) for the item "{PRODUCT_NAME}" has been cancelled.<br>
<br>
<strong>Details</strong><br>
Item: <a href="{PRODUCT_URL}">{PRODUCT_NAME}</a><br>
Start: {START}<br>
End: {END}`,
  },
};
