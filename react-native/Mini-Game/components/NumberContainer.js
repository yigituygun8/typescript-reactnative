import { View, StyleSheet, Text } from "react-native";

export default function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#000",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  number: {
    fontSize: 24,
    fontFamily: "open-sans-bold",
  },
});
