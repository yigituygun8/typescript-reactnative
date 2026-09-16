import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { IconButton } from "../components/UI/IconButton";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getHttpErrorMessage, storeExpense, deleteExpense, updateExpense } from "../utils/http";

const ManageExpenses = ({ route }) => {
  const navigation = useNavigation();

  const expensesContext = useContext(ExpensesContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { expenseId, editOrAdd } = route.params || {};
  const expense = expensesContext.expenses.find(
    (currentExpense) => currentExpense.id === expenseId
  );
  const title = editOrAdd === "edit" ? "Edit Expense" : "Add Expense";

  async function deleteExpenseHandler(expenseIdToDelete) {
    setIsSubmitting(true);
    setError(null);

    try {
      await deleteExpense(expenseIdToDelete);
      expensesContext.deleteExpense(expenseIdToDelete);
      navigation.goBack();
    } catch (requestError) {
      setError(getHttpErrorMessage(requestError));
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function saveExpenseHandler(expenseData) {
    setIsSubmitting(true);
    setError(null);

    try {
      if (editOrAdd === "edit") {
        await updateExpense(expenseId, expenseData);
        expensesContext.updateExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesContext.addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (requestError) {
      setError(getHttpErrorMessage(requestError));
      setIsSubmitting(false);
    }
  }

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.goBack()}
    >
      <Pressable style={styles.card} onPress={Keyboard.dismiss}>
        <LoadingOverlay
          visible={isSubmitting}
          message={editOrAdd === "edit" ? "Saving changes..." : "Adding expense..."}
        />
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {editOrAdd === "edit" && (
            <IconButton
              icon="trash-outline"
              size={32}
              color={GlobalStyles.colors.error500}
              onPress={() => deleteExpenseHandler(expenseId)}
            />
          )}
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <ExpenseForm
          onSubmit={saveExpenseHandler}
          onCancel={cancelHandler}
          submitButtonText={editOrAdd === "edit" ? "Save Changes" : "Add Expense"}
          defaultValues={expense}
          disabled={isSubmitting}
        />
      </Pressable>
    </Pressable>
  );
};
export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  card: {
    width: "92%",
    maxWidth: 420,
    minHeight: 440,
    padding: 20,
    borderRadius: 16,
    backgroundColor: GlobalStyles.colors.primary800,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary400,
    position: "relative",
  },
  title: {
    color: GlobalStyles.colors.primary50,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  error: {
    color: GlobalStyles.colors.error50,
    fontSize: 13,
    marginBottom: 12,
    textAlign: "center",
  },
});