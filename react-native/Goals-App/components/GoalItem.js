import { Text, StyleSheet, Pressable, View } from "react-native";

const GoalItem = ({ item, onDelete, onEdit }) => {
  return (
    <View style={styles.goalItem}>
      <Pressable
        style={styles.goalPressable}
        onPress={() => onDelete(item.key)}
        android_ripple={{ color: "#210644" }}
      >
        <Text style={styles.goalText}>{item.text}</Text>
      </Pressable>
      <Pressable style={styles.editButton} onPress={() => onEdit(item)}>
        <Text style={styles.editButtonText}>Edit</Text>
      </Pressable>
    </View>
  );
};

export { GoalItem };

const styles = StyleSheet.create({
  goalItem: {
    marginHorizontal: 8, // This adds some space around each goal item
    marginVertical: 6, // This adds some space around each goal item
    borderRadius: 6, // This rounds the corners of each goal item
    backgroundColor: "#2563EB", // This sets the background color of each goal item
    flexDirection: "row",
    alignItems: "center",
  },
  goalPressable: {
    flex: 1,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  goalText: {
    color: "white", // This sets the text color to white
    paddingVertical: 8, // This adds some padding inside the text
    paddingHorizontal: 12, // This adds some padding inside the text
  }
});
