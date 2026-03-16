import * as Location from "expo-location";
import { Alert } from "react-native";

import type { ForecastCoordinates } from "@/typescript/weather";

export function useLocation() {
  async function getCurrentCoordinates(): Promise<ForecastCoordinates | null> {
    const currentPermission = await Location.getForegroundPermissionsAsync();
    let currentStatus = currentPermission.status;

    if (currentStatus !== Location.PermissionStatus.GRANTED) {
      const requestedPermission =
        await Location.requestForegroundPermissionsAsync();

      currentStatus = requestedPermission.status;
    }

    if (currentStatus !== Location.PermissionStatus.GRANTED) {
      Alert.alert(
        "Location permission required",
        "Allow location access to load weather for your current location.",
      );

      return null;
    }

    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };
  }

  return {
    getCurrentCoordinates,
  };
}
