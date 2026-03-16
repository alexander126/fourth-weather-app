import { Feather } from "@expo/vector-icons";
import type { TextInputProps } from "react-native";
import { Pressable, TextInput, View } from "react-native";

import { theme } from "@/theme/colors";

import { styles } from "./styles";

type SearchInputProps = TextInputProps & {
  onPress?: () => void;
};

export function SearchInput({
  editable = false,
  onPress,
  style,
  testID,
  ...props
}: SearchInputProps) {


  const content = (
    <View pointerEvents={onPress ? "none" : "auto"} style={styles.container}>
      <Feather color={theme.colors.textSubtle} name="search" size={18} />
      <TextInput
        editable={editable}
        placeholderTextColor={theme.colors.textSubtle}
        selectionColor={theme.colors.accentSky}
        style={[styles.input, style]}
        testID={onPress ? undefined : testID}
        {...props}
      />
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      testID={testID}
      style={({ pressed }) => [styles.trigger, pressed && styles.triggerPressed]}
    >
      {content}
    </Pressable>
  );
}
