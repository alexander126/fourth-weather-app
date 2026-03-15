import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
  },
  primaryAction: {
    alignSelf: "flex-start",
    backgroundColor: "#0f172a",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 999,
  },
  primaryActionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f8fafc",
  },
});
