import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "../screens/CategoriesScreen";
import MealsOverviewScreen from "../screens/MealsOverviewScreen";

const Stack = createNativeStackNavigator();

export default function MealsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#762f05" },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "#f7dece" },
      }}
    >
      <Stack.Screen
        name="MealsCategories"
        component={CategoriesScreen}
        options={{ title: "Meal Categories" }}
      />
      <Stack.Screen
        name="MealsOverview"
        component={MealsOverviewScreen}
      />
    </Stack.Navigator>
  );
}
