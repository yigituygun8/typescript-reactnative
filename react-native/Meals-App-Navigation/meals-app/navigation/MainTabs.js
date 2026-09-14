import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MealsStack from "./MealsStack";
import FavoritesScreen from "../screens/FavoritesScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#762f05",
        tabBarInactiveTintColor: "#667085",
      }}
    >
      <Tab.Screen
        name="Meals"
        component={MealsStack}
        options={{ title: "Meals" }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: "Favorites" }}
      />
    </Tab.Navigator>
  );
}
