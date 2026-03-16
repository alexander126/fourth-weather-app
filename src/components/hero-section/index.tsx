import type { ComponentProps } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { Text, View } from "react-native";

import type { Theme } from "@/theme/colors";
import { theme } from "@/theme/colors";

import { styles } from "./styles";

type HeroSectionProps = {
  cityName: string;
  condition: string;
  currentDate: Date;
  high: number;
  icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
  iconTone: Theme;
  low: number;
  temperature: number;
};

export function HeroSection({
  cityName,
  condition,
  currentDate,
  high,
  icon,
  iconTone,
  low,
  temperature,
}: HeroSectionProps) {
  return (
    <View style={styles.heroSection}>
      <Text style={styles.cityLabel}>{cityName}</Text>
      <Text style={styles.updatedText}>
        {format(currentDate, "EEEE, MMM d")} · Updated{" "}
        {format(currentDate, "h:mm a")}
      </Text>

      <Text style={styles.heroTemperature}>
        {temperature}
        <Text style={styles.heroTemperatureDegree}>°</Text>
      </Text>

      <View style={styles.conditionRow}>
        <MaterialCommunityIcons
          color={theme.colors[iconTone]}
          name={icon}
          size={28}
        />
        <Text style={styles.conditionText}>{condition}</Text>
      </View>

      <Text style={styles.rangeText}>
        H: {high}°   L: {low}°
      </Text>
    </View>
  );
}
