import { StyleSheet, Text, TextInput } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export function Input({ label, textInputConfig, error }) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor={GlobalStyles.colors.primary200}
        {...textInputConfig}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    color: GlobalStyles.colors.primary100,
    fontSize: 13,
    fontWeight: "600",
  },
  input: {
    minHeight: 44,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary400,
    backgroundColor: GlobalStyles.colors.primary700,
    color: GlobalStyles.colors.primary50,
    fontSize: 15,
  },
  inputError: {
    borderColor: GlobalStyles.colors.error500,
  },
  errorText: {
    color: GlobalStyles.colors.error50,
    fontSize: 12,
    marginTop: -4,
  },
});