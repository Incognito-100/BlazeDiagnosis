export function formatDateTime(
  date: Date | string,
  locale = 'en-ZA',
  timeZone = 'Africa/Johannesburg',
) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone,
  }).format(new Date(date));
}
