import { FlatList, StyleSheet, View } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

const CategoriesScreen = ({ navigation }) => { // navigation is a special prop that is automatically passed to every screen component in a React Navigation stack. It provides various methods and properties that allow you to navigate between screens, access route parameters, and manage the navigation state of your app.

  const renderCategoryItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={() => navigation.navigate("MealsOverview", {
            categoryId: itemData.item.id,
            categoryName: itemData.item.title
        })} // You can pass route parameters to the target screen by providing an object as the second argument to the navigate function. In this case, we are passing the categoryId and categoryName as parameters to the "Meals Overview" screen. These parameters can be accessed in the target screen using route.params.
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
      />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
});
