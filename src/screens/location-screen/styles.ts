import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#e2e8f0",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
  },
  secondaryAction: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#94a3b8",
  },
  secondaryActionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },
});
