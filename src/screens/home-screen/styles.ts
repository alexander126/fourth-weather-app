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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
  },
  mainContent: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  panel: {
    borderRadius: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.backgroundSurface,
  },
  panelTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  panelTitle: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "700",
    color: colors.textSubtle,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  forecastRowSeparator: {
    height: 2,
  },
});
