import type { OpenWeatherForecastItem } from "@/typescript/weather";

export function getForecastHigh(items: OpenWeatherForecastItem[]) {
  return Math.round(Math.max(...items.map((item) => item.main.temp_max)));
}
