import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackgroundOrbs } from "@/components/background-orbs";
import { HourlyForecastRow } from "@/components/hourly-forecast-row";
import { StatusScreen } from "@/components/status-screen";
import { groupForecastByDay } from "@/screens/home-screen/utils/group-forecast-by-day";
import { useLocationDataStore } from "@/store/location-data.store";
import { theme } from "@/theme/colors";
import type { OpenWeatherForecastItem } from "@/typescript/weather";
import { formatForecastFullDate } from "@/utils/forecast-date";

import { styles } from "./styles";

const keyExtractor = (item: OpenWeatherForecastItem) => `${item.dt}`;

export default function DayScreen() {
  const { day } = useLocalSearchParams<{ day?: string }>();
  const router = useRouter();
  const data = useLocationDataStore((state) => state.data);

  if (!data) {
    //In theory this shouldnt be possible, since UI is locked if theres no data
    //so navigation event should be impossible to happen but typescript safety requires it
    return (
      <StatusScreen
        message="Open Home first to load forecast data."
        title="Forecast unavailable"
      />
    );
  }

  const dayGroups = groupForecastByDay(data);
  const selectedDayKey = typeof day === "string" ? day : undefined;
  const selectedDay =
    dayGroups.find((group) => group.key === selectedDayKey) ?? dayGroups[0];
  const timezoneOffset = data.city.timezone ?? 0;
  const dayLabel = formatForecastFullDate(selectedDay.date);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <BackgroundOrbs />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="Back to home"
            accessibilityRole="button"
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
          >
            <Feather color={theme.colors.textPrimary} name="chevron-left" size={20} />
          </Pressable>

          <View style={styles.headerCopy}>
            <Text style={styles.headerEyebrow}>Day Breakdown</Text>
            <Text style={styles.headerTitle}>{dayLabel}</Text>
            <Text style={styles.headerMeta}>{data.city.name}</Text>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.panel}>
            <View style={styles.panelTitleRow}>
              <Feather color={theme.colors.textSubtle} name="clock" size={18} />
              <Text style={styles.panelTitle}>Hourly Breakdown</Text>
            </View>

            <Text style={styles.panelMessage}>
              3-hour forecast updates for {dayLabel}.
            </Text>

            <FlatList
              contentContainerStyle={styles.listContent}
              data={selectedDay.items}
              ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
              keyExtractor={keyExtractor}
              renderItem={({ item }) => (
                <HourlyForecastRow
                  item={item}
                  timezoneOffset={timezoneOffset}
                />
              )}
              showsVerticalScrollIndicator={false}
              style={styles.list}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
