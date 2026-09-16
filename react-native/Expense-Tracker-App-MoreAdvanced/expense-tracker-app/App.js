import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { IconButton } from "./components/UI/IconButton";

import ManageExpenses from "./screens/ManageExpenses";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import { GlobalStyles } from "./constants/styles";
import ExpensesContextProvider from "./store/expenses-context";

const Stack = createNativeStackNavigator(); // This is for the stack navigator
const BottomTabs = createBottomTabNavigator(); // This is for the bottom tab navigator
// We will use the stack navigator to navigate between screens and the bottom tab navigator to switch between different tabs in the app.
// Nested Navigators: We can nest navigators inside each other. For example, we can have a stack navigator inside a bottom tab navigator or vice versa. This allows us to create complex navigation structures in our app.

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: "gray",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          color: "white",
        },
        animation: "shift",
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              icon="add"
              onPress={() =>
                navigation.navigate("ManageExpenses", { editOrAdd: "add" })
              }
              size={28}
              color={tintColor}
            />
          );
        },
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          headerTitle: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass-outline" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          headerTitle: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

/*
The navigation structure of the app is as follows:
- Stack Navigator
  - ManageExpenses Screen
  - ExpensesOverview Screen (which contains the Bottom Tab Navigator)
    - RecentExpenses Screen
    - AllExpenses Screen

This means that when the app starts, it will show the ManageExpenses screen first.
From there, the user can navigate to the ExpensesOverview screen, which contains two tabs: RecentExpenses and AllExpenses. 
The user can switch between these two tabs to view different expense data.
*/

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTintColor: GlobalStyles.colors.primary50,
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
              },
              contentStyle: {
                backgroundColor: GlobalStyles.colors.primary800,
              },
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpenses}
              options={{
                headerShown: false,
                title: "Manage Expense",
                presentation: "transparentModal",
                contentStyle: {
                  backgroundColor: "transparent",
                },
                animation: "fade",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}