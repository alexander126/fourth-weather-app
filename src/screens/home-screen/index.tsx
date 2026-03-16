import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackgroundOrbs } from "@/components/background-orbs";
import { ForecastDayRow } from "@/components/forecast-day-row";
import { HeroSection } from "@/components/hero-section";
import { SearchInput } from "@/components/search-input";
import { StatusScreen } from "@/components/status-screen";
import { getForecastHigh } from "@/screens/home-screen/utils/get-forecast-high";
import { getForecastLow } from "@/screens/home-screen/utils/get-forecast-low";
import { getForecastVisual } from "@/screens/home-screen/utils/get-forecast-visual";
import { groupForecastByDay } from "@/screens/home-screen/utils/group-forecast-by-day";
import { fetchWeatherForecast } from "@/services/weather.service";
import { theme } from "@/theme/colors";
import type { OpenWeatherForecastResponse } from "@/typescript/weather";

import { styles } from "./styles";
import { ForecastDayGroup } from "./utils/types";

const keyExtractor = (item: ForecastDayGroup) => item.key


export default function HomeScreen() {
  const [data, setData] = useState<OpenWeatherForecastResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeWeatherData() {
      try {
        setLoading(true);

        const response = await fetchWeatherForecast({
          coords: {
            lat: 37.7749,
            long: -122.4194,
          },
        });


        setData(response);
        setError(null);
        setLoading(false);
      } catch {
        setData(null);
        setError("Please try again in a moment.");
        setLoading(false);
      }
    }

    void loadHomeWeatherData();
  }, []);

  if (loading) {
    return <StatusScreen loading title="Loading forecast..." />;
  }

  if (error) {
    return <StatusScreen message={error} title="Unable to load forecast" />;
  }

  if (!data) {
    return (
      <StatusScreen
        message="Please try again in a moment."
        title="Forecast unavailable"
      />
    );
  }

  const dayGroups = groupForecastByDay(data);
  const currentItem = data.list[0];
  const currentDay = dayGroups[0];
  const timezoneOffset = data.city.timezone ?? 0;
  const currentVisual = getForecastVisual(currentItem);
  const currentDate = new Date((currentItem.dt + timezoneOffset) * 1000);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <BackgroundOrbs />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <SearchInput placeholder="Search for a city..." />
        </View>

        <HeroSection
          cityName={data.city.name}
          condition={currentItem.weather[0]?.main ?? "Unknown"}
          currentDate={currentDate}
          high={getForecastHigh(currentDay.items)}
          icon={currentVisual.icon}
          iconTone={currentVisual.iconTone}
          low={getForecastLow(currentDay.items)}
          temperature={Math.round(currentItem.main.temp)}
        />

        <View style={styles.mainContent}>
          <View style={styles.panel}>
            <View style={styles.panelTitleRow}>
              <Feather
                color={theme.colors.textSubtle}
                name="calendar"
                size={18}
              />
              <Text style={styles.panelTitle}>5-Day Forecast</Text>
            </View>

            <FlatList
              data={dayGroups}
              ItemSeparatorComponent={() => (
                <View style={styles.forecastRowSeparator} />
              )}
              keyExtractor={keyExtractor}
              renderItem={({ item }) => (
                <ForecastDayRow
                  day={item}
                  timezoneOffset={timezoneOffset}
                  todayKey={currentDay.key}
                />
              )}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
