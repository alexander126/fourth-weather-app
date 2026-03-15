import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { styles } from "./styles";

export default function LocationScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Screen</Text>
      <Pressable onPress={() => router.back()} style={styles.secondaryAction}>
        <Text style={styles.secondaryActionLabel}>Back to Home</Text>
      </Pressable>
    </View>
  );
}
