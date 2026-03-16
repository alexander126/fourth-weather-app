import type { StyleProp, ViewStyle } from "react-native";

import { View } from "react-native";

import { styles } from "./styles";

type BackgroundOrbsProps = {
  topOrbStyle?: StyleProp<ViewStyle>;
  sideOrbStyle?: StyleProp<ViewStyle>;
  bottomGlowStyle?: StyleProp<ViewStyle>;
};

export function BackgroundOrbs({
  topOrbStyle,
  sideOrbStyle,
  bottomGlowStyle,
}: BackgroundOrbsProps) {
  return (
    <View pointerEvents="none" style={styles.container}>
      <View style={[styles.topOrb, topOrbStyle]} />
      <View style={[styles.sideOrb, sideOrbStyle]} />
      <View style={[styles.bottomGlow, bottomGlowStyle]} />
    </View>
  );
}
