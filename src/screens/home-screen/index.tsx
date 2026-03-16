import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/react/shallow";

import { BackgroundOrbs } from "@/components/background-orbs";
import { ForecastDayRow } from "@/components/forecast-day-row";
import { HeroSection } from "@/components/hero-section";
import { LocationSearchHeader } from "@/components/location-search-header";
import { StatusScreen } from "@/components/status-screen";
import { SAN_FRANCISCO_COORDS } from "@/config/consts";
import { useLocation } from "@/hooks/use-location";
import { getForecastHigh } from "@/screens/home-screen/utils/get-forecast-high";
import { getForecastLow } from "@/screens/home-screen/utils/get-forecast-low";
import { getForecastVisual } from "@/screens/home-screen/utils/get-forecast-visual";
import { groupForecastByDay } from "@/screens/home-screen/utils/group-forecast-by-day";
import { fetchWeatherForecast } from "@/services/weather.service";
import { useLocationDataStore } from "@/store/location-data.store";
import { theme } from "@/theme/colors";
import type { ForecastCoordinates } from "@/typescript/weather";

import { styles } from "./styles";
import type { ForecastDayGroup } from "./utils/types";

const keyExtractor = (item: ForecastDayGroup) => item.key;

export default function HomeScreen() {
  const router = useRouter();
  const { getCurrentCoordinates } = useLocation();
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const { coords, data, error, loading, setFailure, setLoading, setSuccess } =
    useLocationDataStore(
      useShallow((state) => ({
        coords: state.coords,
        data: state.data,
        error: state.error,
        loading: state.loading,
        setFailure: state.setFailure,
        setLoading: state.setLoading,
        setSuccess: state.setSuccess,
      })),
    );


  async function loadForecastForCoords(coordsToLoad: ForecastCoordinates) {
    try {
      setLoading(true);

      const response = await fetchWeatherForecast({
        coords: coordsToLoad,
      });

      setSuccess({
        coords: coordsToLoad,
        data: response,
      });
    } catch {
      setFailure("Please try again in a moment.");
    }
  }

  function handleSearchInputPress() {
    setIsCityDropdownOpen((currentValue) => !currentValue);
  }

  async function handleSearchBoxPress() {
    setIsCityDropdownOpen(false);

    if (coords?.lat === SAN_FRANCISCO_COORDS.lat &&
      coords?.long === SAN_FRANCISCO_COORDS.long) {
      //Prevent another api request if we already showing SF
      return;
    }

    await loadForecastForCoords(SAN_FRANCISCO_COORDS);
  }

  async function loadCurrentLocationWeather() {
    setIsCityDropdownOpen(false);

    try {
      const currentCoordinates = await getCurrentCoordinates();

      if (!currentCoordinates) {
        return;
      }

      await loadForecastForCoords(currentCoordinates);
    } catch {
      setFailure("Please try again in a moment.");
    }
  }

  useEffect(() => {
    void loadForecastForCoords(SAN_FRANCISCO_COORDS);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Initial demo city load only when store is empty
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
  const canNavigateToDay = Boolean(data) && !error && !loading;

  function handleDayPress(dayKey: string) {
    if (!canNavigateToDay) {
      return;
    }

    router.push({
      pathname: "/day",
      params: { day: dayKey },
    });
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <BackgroundOrbs />

      <SafeAreaView style={styles.safeArea}>
        <LocationSearchHeader
          currentCityName={data.city.name}
          dropdownOptionLabel="San Francisco"
          dropdownOptionMeta="America"
          isDropdownOpen={isCityDropdownOpen}
          onDropdownOptionPress={handleSearchBoxPress}
          onLocationPress={loadCurrentLocationWeather}
          onSearchPress={handleSearchInputPress}
        />

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
                  onPress={() => handleDayPress(item.key)}
                  timezoneOffset={timezoneOffset}
                  disabled={!canNavigateToDay}
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
