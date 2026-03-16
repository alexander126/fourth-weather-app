import { StyleSheet } from "react-native";

import { theme } from "@/theme/colors";

const { colors } = theme;

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    minHeight: 64,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: "space-between",
  },
  tempRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dayLabel: {
    width: 54,
    flexShrink: 0,
    fontSize: 16,
    fontWeight: "600",
    color: colors.textMuted,
  },
  dayLabelCurrent: {
    color: colors.textPrimary,
  },
  iconColumn: {
    width: 40,
    flexShrink: 0,
    alignItems: "center",
  },

  tempValue: {
    flexShrink: 0,
    textAlign: "right",
    fontSize: 12,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  chevronWrap: {
    width: 20,
    marginLeft: 4,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
