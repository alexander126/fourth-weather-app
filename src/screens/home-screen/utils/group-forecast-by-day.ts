import type { OpenWeatherForecastResponse } from "@/typescript/weather";

import type { ForecastDayGroup } from "./types";

export function groupForecastByDay(
  response: OpenWeatherForecastResponse,
): ForecastDayGroup[] {
  const dayGroups = new Map<string, ForecastDayGroup>();

  for (const item of response.list) {
    const shiftedDate = new Date((item.dt + response.city.timezone) * 1000);
    const key = shiftedDate.toISOString().slice(0, 10);
    const existingGroup = dayGroups.get(key);

    if (existingGroup) {
      existingGroup.items.push(item);
      continue;
    }

    dayGroups.set(key, {
      date: shiftedDate,
      items: [item],
      key,
    });
  }

  return Array.from(dayGroups.values()).slice(0, 5);
}
