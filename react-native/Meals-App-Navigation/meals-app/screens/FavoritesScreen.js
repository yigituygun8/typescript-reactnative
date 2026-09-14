import { StyleSheet, Text, View } from "react-native";

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.message}>Your favorite meals will appear here.</Text>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f7dece",
  },
  title: {
    color: "#762f05",
    fontSize: 26,
    fontWeight: "700",
  },
  message: {
    marginTop: 8,
    color: "#667085",
    fontSize: 16,
    textAlign: "center",
  },
});
