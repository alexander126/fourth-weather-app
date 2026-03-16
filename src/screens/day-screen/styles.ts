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
    paddingBottom: 12,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.backgroundSurface,
  },
  backButtonPressed: {
    backgroundColor: colors.backgroundSurfacePressed,
  },
  headerCopy: {
    marginLeft: 14,
  },
  headerEyebrow: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.textSubtle,
  },
  headerTitle: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  headerMeta: {
    marginTop: 6,
    fontSize: 13,
    color: colors.textSubtle,
  },
  mainContent: {
    flex: 1,
    marginTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  panel: {
    flex: 1,
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
  panelMessage: {
    marginBottom: 16,
    fontSize: 13,
    color: colors.textSubtle,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 12,
  },
  rowSeparator: {
    height: 8,
  },
});
