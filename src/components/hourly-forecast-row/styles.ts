import { StyleSheet } from "react-native";

import { theme } from "@/theme/colors";

const { colors } = theme;

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 72,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 22,
    backgroundColor: colors.backgroundSurfaceSoft,
  },
  timeLabel: {
    width: 76,
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  conditionColumn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  conditionCopy: {
    marginLeft: 12,
    flexShrink: 1,
  },
  conditionLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  conditionMeta: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textSubtle,
  },
  metrics: {
    alignItems: "flex-end",
    marginLeft: 12,
  },
  temperatureLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  popLabel: {
    marginTop: 4,
    fontSize: 12,
    color: colors.accentSky,
  },
});
