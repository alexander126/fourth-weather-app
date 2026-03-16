import type { OpenWeatherForecastItem } from "@/typescript/weather";

import type { ForecastVisual } from "./types";

export function getForecastVisual(item: OpenWeatherForecastItem): ForecastVisual {
  const weather = item.weather[0];

  if (!weather) {
    return {
      icon: "weather-cloudy",
      iconTone: "iconCloud",
    };
  }

  const isNight = weather.icon.endsWith("n");

  if (weather.id === 800) {
    return isNight
      ? { icon: "weather-night", iconTone: "iconNight" }
      : { icon: "weather-sunny", iconTone: "iconSun" };
  }

  if (weather.id >= 801 && weather.id <= 803) {
    return isNight
      ? { icon: "weather-night-partly-cloudy", iconTone: "iconNight" }
      : { icon: "weather-partly-cloudy", iconTone: "iconCloudSoft" };
  }

  if (weather.id === 804) {
    return {
      icon: "weather-cloudy",
      iconTone: "iconCloud",
    };
  }

  if (weather.id >= 200 && weather.id < 300) {
    return {
      icon: "weather-lightning-rainy",
      iconTone: "iconRainStrong",
    };
  }

  if (weather.id >= 300 && weather.id < 600) {
    return weather.id >= 502
      ? { icon: "weather-pouring", iconTone: "iconRainStrong" }
      : { icon: "weather-rainy", iconTone: "iconRain" };
  }

  if (weather.id >= 600 && weather.id < 700) {
    return {
      icon: "weather-snowy",
      iconTone: "iconCloudSoft",
    };
  }

  if (weather.id >= 700 && weather.id < 800) {
    return {
      icon: "weather-fog",
      iconTone: "iconCloud",
    };
  }

  return {
    icon: "weather-cloudy",
    iconTone: "iconCloud",
  };
}
