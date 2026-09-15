import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { MEALS } from "../data/dummy-data";
import MealList from "../components/MealList";
import { FavoritesContext } from "../store/context/favorites-context";

const FavoritesScreen = ({ navigation }) => {
  const favoritesCtx = useContext(FavoritesContext);
  const favoriteMeals = MEALS.filter((meal) =>
    favoritesCtx.ids.includes(meal.id)
  );

  if (favoriteMeals.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.title}>No favorite meals found.</Text>
          <Text style={styles.message}>
            You haven't added any meals to your favorites yet.
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
			<MealList
				meals={favoriteMeals}
				onMealPress={(meal) =>
					navigation.navigate("MealDetail", { mealProps: meal })
				}
			/>
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7dece",
  },
  title: {
    color: "#762f05",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
  },
  message: {
    marginTop: 8,
    color: "#667085",
    fontSize: 16,
    textAlign: "center",
  },
});
