import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { format, isToday } from "date-fns";
import { Text, View } from "react-native";

import { getForecastHigh } from "@/screens/home-screen/utils/get-forecast-high";
import { getForecastLow } from "@/screens/home-screen/utils/get-forecast-low";
import { getForecastVisual } from "@/screens/home-screen/utils/get-forecast-visual";
import { getRepresentativeForecastItem } from "@/screens/home-screen/utils/get-representative-forecast-item";
import type { ForecastDayGroup } from "@/screens/home-screen/utils/types";
import { theme } from "@/theme/colors";

import { styles } from "./styles";

type ForecastDayRowProps = {
  day: ForecastDayGroup;
  timezoneOffset: number;
  todayKey: string;
};

export function ForecastDayRow({
  day,
  timezoneOffset,
  todayKey,
}: ForecastDayRowProps) {
  const representativeItem = getRepresentativeForecastItem(
    day.items,
    timezoneOffset,
  );
  const visual = getForecastVisual(representativeItem);
  const low = getForecastLow(day.items);
  const high = getForecastHigh(day.items);

  const isCurrentDay = day.key === todayKey;
  const dayLabel = isToday(day.date) ? "Today" : format(day.date, "EEE");

  return (
    <View style={styles.row}>
      <Text
        numberOfLines={1}
        style={[styles.dayLabel, isCurrentDay && styles.dayLabelCurrent]}
      >
        {dayLabel}
      </Text>

      <View style={styles.iconColumn}>
        <MaterialCommunityIcons
          color={theme.colors[visual.iconTone]}
          name={visual.icon}
          size={24}
        />
      </View>
      <View style={styles.tempRow}>
        <Text style={styles.tempValue}>L: {low}°</Text>
        <Text style={styles.tempValue}>H: {high}°</Text>
        <View style={styles.chevronWrap}>

          <Feather color={theme.colors.textDim} name="chevron-right" size={16} />
        </View>
      </View>
    </View>
  );
}
