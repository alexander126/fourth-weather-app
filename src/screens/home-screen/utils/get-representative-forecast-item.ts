import type { OpenWeatherForecastItem } from "@/typescript/weather";

export function getRepresentativeForecastItem(
  items: OpenWeatherForecastItem[],
  timezoneOffset: number,
) {
  const middayMinutes = 12 * 60;

  return items.reduce((closestItem, currentItem) => {
    const closestDate = new Date((closestItem.dt + timezoneOffset) * 1000);
    const currentDate = new Date((currentItem.dt + timezoneOffset) * 1000);
    const closestMinutes =
      closestDate.getUTCHours() * 60 + closestDate.getUTCMinutes();
    const currentMinutes =
      currentDate.getUTCHours() * 60 + currentDate.getUTCMinutes();

    return Math.abs(currentMinutes - middayMinutes) <
      Math.abs(closestMinutes - middayMinutes)
      ? currentItem
      : closestItem;
  });
}
