import { Pressable, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export function Button({
  children,
  onPress,
  mode = "default",
  style,
  textStyle,
  disabled = false,
}) {
  const isFlat = mode === "flat";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        isFlat && styles.flatButton,
        style,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text
        style={[
          styles.text,
          isFlat && styles.flatText,
          textStyle,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: 120,
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.accent500,
  },
  flatButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary400,
  },
  text: {
    color: GlobalStyles.colors.primary800,
    fontSize: 14,
    fontWeight: "700",
  },
  flatText: {
    color: GlobalStyles.colors.primary50,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
});
