import type { ComponentProps } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import type { OpenWeatherForecastItem } from "@/typescript/weather";
import type { Theme } from "@/theme/colors";

type WeatherIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];
type PercentValue = `${number}%`;

export type ForecastDayGroup = {
  date: Date;
  items: OpenWeatherForecastItem[];
  key: string;
};

export type ForecastVisual = {
  icon: WeatherIconName;
  iconTone: Theme;
};

export type ForecastRangeOffsets = {
  rangeEnd: PercentValue;
  rangeStart: PercentValue;
};
