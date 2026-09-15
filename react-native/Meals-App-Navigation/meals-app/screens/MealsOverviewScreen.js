import { StyleSheet, Text, View } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealList from "../components/MealList";
import { useLayoutEffect } from "react";

const MealsOverviewScreen = ({ route, navigation }) => {
  const catId = route.params.categoryId;
  const categoryName = route.params.categoryName;
	const displayedMeals = MEALS.filter((meal) => meal.categoryIds.indexOf(catId) >= 0);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: categoryName,
			animation: "slide_from_bottom", // This option specifies the type of animation to be used when transitioning to the "MealsOverview" screen. In this case, it is set to "fade", which means that the new screen will fade in as it appears, creating a smooth visual transition effect.
			headerBackTitle: "Back to Categories", // This option sets the text that appears on the back button in the header of the "MealsOverview" screen.
		});
	}, [navigation, categoryName]);

  return (
    <View style={styles.container}>
      <Text>Meals Overview Screen</Text>
			<MealList
				meals={displayedMeals}
				onMealPress={(meal) =>
					navigation.navigate("MealDetail", { mealProps: meal })
				}
			/>
    </View>
  );
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
	mealList: {
		
	}
});
