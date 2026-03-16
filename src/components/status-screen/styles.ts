import { StyleSheet } from "react-native";

import { theme } from "@/theme/colors";

const { colors } = theme;

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundBase,
  },
  safeArea: {
    flex: 1,
  },
  statusPanel: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 24,
    marginTop: 12,
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.backgroundSurface,
  },
  statusTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  statusMessage: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    color: colors.textMuted,
  },
});
