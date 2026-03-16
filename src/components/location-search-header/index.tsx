import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { SearchInput } from "@/components/search-input";
import { theme } from "@/theme/colors";

import { styles } from "./styles";

type LocationSearchHeaderProps = {
  currentCityName: string;
  dropdownOptionLabel: string;
  dropdownOptionMeta: string;
  isDropdownOpen: boolean;
  onDropdownOptionPress: () => void | Promise<void>;
  onLocationPress: () => void | Promise<void>;
  onSearchPress: () => void;
};

export function LocationSearchHeader({
  currentCityName,
  dropdownOptionLabel,
  dropdownOptionMeta,
  isDropdownOpen,
  onDropdownOptionPress,
  onLocationPress,
  onSearchPress,
}: LocationSearchHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.searchStack}>
        <SearchInput
          onPress={onSearchPress}
          placeholder="Search for a city..."
          testID="choose-forecast-city-button"
          value={currentCityName}
        />

        {isDropdownOpen ? (
          <View style={styles.dropdown}>
            <Pressable
              accessibilityRole="button"
              onPress={onDropdownOptionPress}
              testID="select-san-francisco-button"
              style={({ pressed }) => [
                styles.dropdownOption,
                pressed && styles.dropdownOptionPressed,
              ]}
            >
              <Text style={styles.dropdownOptionLabel}>
                {dropdownOptionLabel}
              </Text>
              <Text style={styles.dropdownOptionMeta}>{dropdownOptionMeta}</Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={onLocationPress}
        testID="use-current-location-button"
        style={({ pressed }) => [
          styles.locationButton,
          pressed && styles.locationButtonPressed,
        ]}
      >
        <Feather color={theme.colors.accentSky} name="navigation" size={20} />
      </Pressable>
    </View>
  );
}
