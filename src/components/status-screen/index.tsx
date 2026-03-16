import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackgroundOrbs } from "@/components/background-orbs";
import { theme } from "@/theme/colors";

import { styles } from "./styles";

type StatusScreenProps = {
  loading?: boolean;
  message?: string;
  title: string;
};

export function StatusScreen({
  loading = false,
  message,
  title,
}: StatusScreenProps) {
  return (
    <View style={styles.screen}>
      <BackgroundOrbs />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.statusPanel}>
          {loading ? (
            <ActivityIndicator color={theme.colors.accentSky} size="small" />
          ) : null}
          <Text style={styles.statusTitle}>{title}</Text>
          {message ? <Text style={styles.statusMessage}>{message}</Text> : null}
        </View>
      </SafeAreaView>
    </View>
  );
}
