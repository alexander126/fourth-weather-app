
import { Feather } from "@expo/vector-icons";
import type { TextInputProps } from "react-native";
import { TextInput, View } from "react-native";

import { theme } from "@/theme/colors";

import { styles } from "./styles";

export function SearchInput({
  editable = false,
  style,
  ...props
}: TextInputProps) {
  return (
    <View style={styles.container}>
      <Feather color={theme.colors.textSubtle} name="search" size={18} />
      <TextInput
        editable={editable}
        placeholderTextColor={theme.colors.textSubtle}
        selectionColor={theme.colors.accentSky}
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
}
