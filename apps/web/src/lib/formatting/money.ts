export function formatMoney(
  amount: number,
  currency = 'ZAR',
  locale = 'en-ZA',
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}
