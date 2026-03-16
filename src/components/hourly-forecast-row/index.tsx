import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { getForecastVisual } from "@/screens/home-screen/utils/get-forecast-visual";
import { theme } from "@/theme/colors";
import type { OpenWeatherForecastItem } from "@/typescript/weather";
import { formatForecastTime } from "@/utils/forecast-date";

import { styles } from "./styles";

type HourlyForecastRowProps = {
  item: OpenWeatherForecastItem;
  timezoneOffset: number;
};

export function HourlyForecastRow({
  item,
  timezoneOffset,
}: HourlyForecastRowProps) {
  const visual = getForecastVisual(item);
  const forecastDate = new Date((item.dt + timezoneOffset) * 1000);

  return (
    <View style={styles.row}>
      <Text style={styles.timeLabel}>{formatForecastTime(forecastDate)}</Text>

      <View style={styles.conditionColumn}>
        <MaterialCommunityIcons
          color={theme.colors[visual.iconTone]}
          name={visual.icon}
          size={22}
        />

        <View style={styles.conditionCopy}>
          <Text style={styles.conditionLabel}>
            {item.weather[0]?.main ?? "Unknown"}
          </Text>
          <Text style={styles.conditionMeta}>
            Feels like {Math.round(item.main.feels_like)}°
          </Text>
        </View>
      </View>

      <View style={styles.metrics}>
        <Text style={styles.temperatureLabel}>{Math.round(item.main.temp)}°</Text>
        <Text style={styles.popLabel}>{Math.round(item.pop * 100)}%</Text>
      </View>
    </View>
  );
}
