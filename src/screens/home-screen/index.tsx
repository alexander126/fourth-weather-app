import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

import { styles } from "./styles";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Link asChild href="./location">
        <Pressable style={styles.primaryAction}>
          <Text style={styles.primaryActionLabel}>Go to Location</Text>
        </Pressable>
      </Link>
    </View>
  );
}
