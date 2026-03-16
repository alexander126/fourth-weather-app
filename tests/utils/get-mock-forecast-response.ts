import type { OpenWeatherForecastResponse } from "@/typescript/weather";

import forecastResponseJson from "../__mocks__/open-weather-forecast-response.json";

export function getMockForecastResponse(): OpenWeatherForecastResponse {
  //ensure each test get fresh copy of the data to avoid mutated data in tests
  return structuredClone(forecastResponseJson) as OpenWeatherForecastResponse;
}
