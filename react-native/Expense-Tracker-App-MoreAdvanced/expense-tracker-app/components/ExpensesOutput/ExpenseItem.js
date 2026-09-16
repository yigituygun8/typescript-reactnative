import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../utils/date";
import { useNavigation } from "@react-navigation/native";
// We will use the useNavigation hook to navigate to the ManageExpenses screen when an expense item is pressed.
// the reason why we are using it is that ExpenseItem is not a screen component, so it does not have access to the navigation prop. By using the useNavigation hook, we can get access to the navigation object and use it to navigate to the ManageExpenses screen.

const ExpenseItem = ({ expense }) => {
  const navigation = useNavigation();

  function expensePressHandler(expenseId) {
    navigation.navigate("ManageExpenses", {
      expenseId: expenseId,
      editOrAdd: "edit",
    });
  }

  return (
    <Pressable
      onPress={() => expensePressHandler(expense.id)}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View style={styles.expenseDetails}>
          <Text style={styles.description}>{expense.description}</Text>
          <Text style={styles.date}>{getFormattedDate(expense.date)}</Text>
        </View>
        <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    backgroundColor: GlobalStyles.colors.primary700,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary400,
  },
  expenseDetails: {
    flex: 1,
    marginRight: 16,
  },
  description: {
    color: GlobalStyles.colors.primary50,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  date: {
    color: GlobalStyles.colors.primary100,
    fontSize: 13,
  },
  amount: {
    color: GlobalStyles.colors.accent500,
    fontSize: 16,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.7,
  },
});
