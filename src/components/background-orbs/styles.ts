import { StyleSheet } from "react-native";

import { theme } from "@/theme/colors";

const { colors } = theme;

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  topOrb: {
    position: "absolute",
    top: -120,
    right: -40,
    width: 280,
    height: 280,
    borderRadius: 999,
    backgroundColor: colors.orbPrimary,
  },
  sideOrb: {
    position: "absolute",
    top: 140,
    left: -160,
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: colors.orbSecondary,
  },
  bottomGlow: {
    position: "absolute",
    bottom: -120,
    left: 24,
    right: 24,
    height: 280,
    borderRadius: 240,
    backgroundColor: colors.backgroundGlow,
  },
});
