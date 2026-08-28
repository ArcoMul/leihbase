module.exports = {
  reservation_confirmation: {
    subject: "Reservation confirmation of '{{productName}}'",
    html: `Hi {{userName}},<br>
<br>
We hereby confirm the reservation of the item
"<a href="{{productUrl}}">{{productName}}</a>"<br>
<br>
Your reservation runs from {{start}} to {{end}}.<br>
<br>
The item can be picked up at {{start}}. If it is the first time that
you are borrowing something, we will ask you to sign the
{{#if lendingConditionsLink}}<a href="{{lendingConditionsLink}}">{{/if}}terms and conditions{{#if lendingConditionsLink}}</a>{{/if}} of borrowing on site.<br>
<br>
{{#if deposit}}A deposit of {{deposit}} is required to borrow {{productName}}. Please bring the exact amount if possible.<br><br>{{/if}}
You can cancel your reservation or change the borrowing period in your <a href="{{appUrl}}/reservations">reservation overview</a>.<br>
<br>
We're happy that you have decided to borrow instead of buy!<br>
<br>
See you soon<br>
Your Leihbar`,
  },
  reservation_confirmation_location: {
    subject: "New reservation: {{userName}} - {{productName}}",
    html: `Hi,<br>
<br>
A new reservation by {{userName}} (<a href="mailto:{{userEmail}}">{{userEmail}}</a>).<br>
<br>
<strong>Details</strong><br>
Item: <a href="{{productUrl}}">{{productName}}</a><br>
Start: {{start}}<br>
End: {{end}}<br>
{{#if message}}
<br>
{{userName}} writes:<br>
<blockquote>
{{message}}<br>
</blockquote>
{{/if}}`,
  },
  reservation_start_reminder: {
    subject: "Pick-up of '{{productName}}'",
    html: `Hi {{userName}},<br>
<br>
you reserved a {{productName}} at {{locationName}}. The item can be picked up tomorrow ({{start}}) {{#if startHour}}between {{startHour}} and {{endHour}}{{/if}}.<br>
If you no longer need it, you can cancel your reservation in your <a href="{{appUrl}}/reservations">reservation overview</a>.<br>
<br>
Thank you that you choose for borrowing instead of buying!<br>
<br>
See you soon<br>
Your LeihBar<br>`,
  },
  reservation_end_reminder: {
    subject: "Return of '{{productName}}'",
    html: `Hi {{userName}},<br>
<br>
we hope everything worked out well with the item '{{productName}}'!
<br>
The borrow-period ends tomorrow ({{end}}), so we would like to remind you of returning it to {{locationName}}.<br>
<br>
{{#if startHour}}{{locationName}} is tomorrow open from {{startHour}} to {{endHour}}.<br><br>{{/if}}
If you would like to keep the item for longer, you can extend the reservation in your <a href="{{appUrl}}/reservations">reservation overview</a>.<br>
<br>
Thank you, and see you tomorrow!<br>
Your LeihBar-Team`,
  },
  cancellation_confirmation: {
    subject: "Cancellation confirmation for {{productName}}",
    html: `Hi {{userName}},<br>
<br>
We hereby confirm the cancellation of your reservation for the item "<a href="{{productUrl}}">{{productName}}</a>".<br>
<br>
Thanks for sharing, the item is now available again for other neighbours!<br>
<br>
See you next time!<br>
<br>
Your Leihbar`,
  },
  reservation_cancellation_location: {
    subject: "Cancellation: {{userName}} - {{productName}}",
    html: `The reservation of {{userName}} (<a href="mailto:{{userEmail}}">{{userEmail}}</a>) for the item "{{productName}}" has been cancelled.<br>
<br>
<strong>Details</strong><br>
Item: <a href="{{productUrl}}">{{productName}}</a><br>
Start: {{start}}<br>
End: {{end}}`,
  },
};
