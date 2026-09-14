import { Pressable, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import MealDetailScreen from "../screens/MealDetailScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#762f05" },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "#f7dece" },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({ route, navigation }) => ({
          title: route.params?.mealProps?.title ?? "Meal Details",
          presentation: "modal",
          headerBackVisible: false,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              accessibilityLabel="Close meal details"
              hitSlop={10}
            >
              <Text style={{ color: "white", fontSize: 18 }}>X</Text>
            </Pressable>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
