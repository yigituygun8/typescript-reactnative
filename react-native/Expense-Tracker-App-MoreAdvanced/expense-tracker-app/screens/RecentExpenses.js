import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { useEffect } from "react";
import { fetchExpenses } from "../utils/http";
import { getHttpErrorMessage } from "../utils/http";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";

const RecentExpenses = () => {
  const expensesContext = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses();
        expensesContext.setExpenses(expenses.data);
      } catch (requestError) {
        setError(getHttpErrorMessage(requestError));
      } finally {
        setIsLoading(false);
      }
    }
    getExpenses();
  }, []);

  if (isLoading) {
    return <LoadingOverlay message="Loading expenses..." />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  // we wanna forward recent expenses only
  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput periodName="Last 7 Days" expenses={recentExpenses} fallBackText="No recent expenses found in the last 7 days." />
  )
}

export default RecentExpenses

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#200364",
    padding: 24,
  },
  error: {
    color: "#fcc4e4",
    textAlign: "center",
  },
});

