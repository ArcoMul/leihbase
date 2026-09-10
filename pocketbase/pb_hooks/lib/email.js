/// <reference path="../../pb_data/types.d.ts" />
/// <reference path="../types.d.ts" />

/**
 * Gets default template for a given name and locale
 * @param {TemplateName} templateName
 * @param {string} locale
 * @returns {{subject: string, html: string}|null}
 */
function getDefaultTemplate(templateName, locale) {
  try {
    /** @type {typeof import('./emails.en')} */
    const templates = require(`${__hooks}/lib/emails.${locale}`);
    if (templates[templateName]) {
      return { ...templates[templateName] };
    }
  } catch (e) {
    console.error(`[email] Failed to load default template ${templateName} for locale ${locale}:`, e);
  }
  return null;
}

/**
 * Renders a template with variables (supports {{varName}} and {{#if varName}}...{{/if}} syntax)
 * @param {string} template
 * @param {Object} variables
 * @returns {string}
 */
function renderTemplate(template, variables) {
  if (!template) {
    return template;
  }

  let result = template;

  // First, process {{#if variable}}...{{/if}} conditionals
  // Uses non-greedy matching ([\s\S]*?) to handle content across multiple lines
  result = result.replace(/\{#if (\w+)\}([\s\S]*?)\{\/if\}/g, (match, varName, content) => {
    return variables[varName] ? content : "";
  });

  // Then replace {{variableName}} placeholders
  result = result.replace(/\{(\w+)\}/g, (match, varName) => {
    return variables[varName] !== undefined ? variables[varName] : match;
  });

  return result;
}

/**
 * Gets sender info for a location (falls back to global settings)
 * @param {core.Record} location
 * @returns {{address: string, name: string}}
 */
function getSenderInfo(location) {
  if (location.get("email_sender_name") || location.get("email_sender_address")) {
    return {
      address: location.get("email_sender_address") || $app.settings().meta.senderAddress,
      name: location.get("email_sender_name") || $app.settings().meta.senderName,
    };
  }
  return {
    address: $app.settings().meta.senderAddress,
    name: $app.settings().meta.senderName,
  };
}

/**
 * Fetches email templates for a location and template type from the database
 * @param {string} locationId
 * @param {TemplateName} templateName
 * @param {string} locale
 * @returns {{subject: string, html: string}|null}
 */
function getEmailTemplate(locationId, templateName, locale) {
  const templates = $app.findRecordsByFilter(
    "email_templates",
    `location = {:locationId} && name = {:templateName} && locale = {:locale} && enabled = true`,
    null,
    1,
    0,
    {
      locationId,
      templateName,
      locale,
    }
  );

  if (templates.length > 0) {
    return {
      subject: templates[0].get("subject"),
      html: templates[0].get("html"),
    };
  }

  return null;
}

/**
 * Gets a template (custom or default) and renders it with variables
 * @param {core.Record} location
 * @param {TemplateName} templateName
 * @param {Object} templateVars - Variables for template rendering
 * @param {string} locale
 * @returns {{subject: string, html: string}}
 */
function getRenderedTemplate(location, templateName, templateVars, locale) {
  // Try to get custom template from database
  const customTemplate = getEmailTemplate(location.get("id"), templateName, locale);

  // Try to get default template
  const defaultTemplate = getDefaultTemplate(templateName, locale);

  // Use custom template if available, otherwise use default
  const template = customTemplate || defaultTemplate;

  if (template) {
    return {
      subject: renderTemplate(template.subject, templateVars),
      html: renderTemplate(template.html, templateVars),
    };
  }

  // Fallback to empty template (should not happen with proper defaults)
  return { subject: templateName, html: "" };
}

/**
 * Formats a date for use in email templates
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date) {
  if (!date) return "";
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

/**
 * Formats currency for use in email templates
 * @param {number} n
 * @returns {string}
 */
function formatCurrency(n) {
  if (!n) return "";
  return `${Math.round(n)}€`;
}

/**
 * Sends an email to recipient(s) using a template
 * @param {core.Record} location - The location
 * @param {TemplateName} templateName - Name of the template type
 * @param {string|string[]} recipientEmail - Email address(es) of the recipient(s)
 * @param {string} locale - Locale for template lookup
 * @param {Object} templateVars - Variables for template rendering
 */
function sendLocationTemplateEmail(location, templateName, recipientEmail, locale, templateVars) {
  const senderInfo = getSenderInfo(location);
  
  const emailTemplate = getRenderedTemplate(location, templateName, templateVars, locale);

  // Support both single email string and array of emails
  const recipients = Array.isArray(recipientEmail) 
    ? recipientEmail.map(email => ({ address: email }))
    : [{ address: recipientEmail }];

  const email = new MailerMessage({
    from: senderInfo,
    to: recipients,
    ...emailTemplate,
  });
  $app.newMailClient().send(email);
}

module.exports = {
  sendLocationTemplateEmail,
  getRenderedTemplate,
  getSenderInfo,
  getEmailTemplate,
  getDefaultTemplate,
  renderTemplate,
  formatDate,
  formatCurrency,
};
