import type { OpenWeatherForecastItem } from "@/typescript/weather";

export function getForecastLow(items: OpenWeatherForecastItem[]) {
  return Math.round(Math.min(...items.map((item) => item.main.temp_min)));
}
