export function formatCurrency(amount: number, locale: string) {
  if (locale === "de") {
    return `${amount}€`;
  } else {
    return `€${amount}`;
  }
}
