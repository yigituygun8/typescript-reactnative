import { StyleSheet, View, Text} from 'react-native'
import ExpensesList from './ExpensesList'
import ExpensesSummary from './ExpensesSummary'
import { GlobalStyles } from '../../constants/styles'

const ExpensesOutput = ( { expenses, periodName, fallBackText }) => { // we will get periodName from the parent component (AllExpenses.js or RecentExpenses.js) and expenses from the parent component (AllExpenses.js or RecentExpenses.js)
  const isEmpty = expenses.length === 0;
  if (isEmpty) {
    return (
      <View style={styles.container}>
        <ExpensesSummary expenses={expenses} periodName={periodName} />
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>{fallBackText}</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
			<ExpensesSummary expenses={expenses} periodName={periodName} />
			<ExpensesList expenses={expenses} />
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: GlobalStyles.colors.primary50,
  },
})