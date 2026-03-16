import { StyleSheet } from "react-native";

import { theme } from "@/theme/colors";

const { colors } = theme;

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
  },
  searchStack: {
    flex: 1,
    position: "relative",
    zIndex: 1,
  },
  dropdown: {
    position: "absolute",
    top: 66,
    left: 0,
    right: 0,
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.backgroundGlow,
  },
  dropdownOption: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.backgroundSurfaceSoft,
  },
  dropdownOptionPressed: {
    backgroundColor: colors.backgroundSurfaceStrong,
  },
  dropdownOptionLabel: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "600",
  },
  dropdownOptionMeta: {
    marginTop: 4,
    color: colors.textSubtle,
    fontSize: 12,
  },
  locationButton: {
    width: 52,
    height: 52,
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.backgroundSurface,
  },
  locationButtonPressed: {
    backgroundColor: colors.backgroundSurfaceStrong,
  },
});
