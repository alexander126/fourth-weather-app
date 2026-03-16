import { StyleSheet } from "react-native";

import { theme } from "@/theme/colors";

const { colors } = theme;

export const styles = StyleSheet.create({
  heroSection: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  cityLabel: {
    fontSize: 32,
    fontWeight: "300",
    color: colors.textPrimary,
    letterSpacing: 0.4,
  },
  updatedText: {
    marginTop: 8,
    fontSize: 13,
    color: colors.textSubtle,
  },
  heroTemperature: {
    marginTop: 18,
    fontSize: 86,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  heroTemperatureDegree: {
    fontSize: 34,
    fontWeight: "300",
    color: colors.textSecondary,
    lineHeight: 40,
  },
  conditionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  conditionText: {
    marginLeft: 8,
    fontSize: 22,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  rangeText: {
    marginTop: 14,
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSubtle,
    letterSpacing: 0.4,
  },
});
