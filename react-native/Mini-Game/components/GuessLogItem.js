import { View, StyleSheet, Text } from "react-native";
import Colors from "../utils/colors";

export default function GuessLogItem({ roundNumber, guess }) {
  return (
    <View style={styles.listItem}>
      <Text>#{roundNumber}</Text>
      <Text>Opponent's Guess: {guess}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 40,
    marginVertical: 16,
    marginHorizontal: 12,
    backgroundColor: Colors.accent,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
