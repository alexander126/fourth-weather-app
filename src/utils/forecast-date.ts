const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
  weekday: "long",
});

const shortDayFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  weekday: "short",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  hour12: true,
  minute: "2-digit",
  timeZone: "UTC",
});

export function formatForecastFullDate(date: Date) {
  return fullDateFormatter.format(date);
}

export function formatForecastShortDay(date: Date) {
  return shortDayFormatter.format(date);
}

export function formatForecastTime(date: Date) {
  return timeFormatter.format(date);
}
