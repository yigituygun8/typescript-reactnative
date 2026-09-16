import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const expensesContext = useContext(ExpensesContext);

  return (
    <ExpensesOutput periodName="All Time" expenses={expensesContext.expenses} fallBackText="No expenses found." />
  )
}

export default AllExpenses

