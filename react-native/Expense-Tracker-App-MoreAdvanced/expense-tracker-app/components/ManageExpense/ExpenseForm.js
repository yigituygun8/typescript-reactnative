import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "../UI/Button";
import { Input } from "./Input";

const ExpenseForm = ({ onSubmit, onCancel, submitButtonText, defaultValues, disabled = false }) => {
	const [inputs, setInputs] = useState({
		description: defaultValues?.description ?? "",
		amount: defaultValues?.amount?.toString() ?? "",
		date: defaultValues?.date
			? defaultValues.date.toISOString().slice(0, 10)
			: "",
	});
	const [inputErrors, setInputErrors] = useState({});

	function inputChangedHandler(inputIdentifier, enteredValue) {
		setInputs((currentInputs) => ({
			...currentInputs,
			[inputIdentifier]: enteredValue,
		}));
		setInputErrors((currentErrors) => ({
			...currentErrors,
			[inputIdentifier]: undefined,
		}));
	}

	function submitHandler() {
    // validation
    const expenseData = {
      description: inputs.description,
      amount: +inputs.amount,
      date: new Date(inputs.date),
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
			setInputErrors({
				amount: amountIsValid ? undefined : "Enter an amount greater than 0.",
				date: dateIsValid ? undefined : "Enter a valid date, for example 2026-09-16.",
				description: descriptionIsValid ? undefined : "Add a short description for this expense.",
			});
      return;
    }

    // submit the form data to the parent component (ManageExpenses.js) via the onSubmit prop
		onSubmit(expenseData);
	}

	return (
		<View style={styles.form}>
			<Input
				label="Description"
				error={inputErrors.description}
				textInputConfig={{
					placeholder: "Enter a description",
					value: inputs.description,
					onChangeText: (enteredValue) => inputChangedHandler("description", enteredValue),
					multiline: true,
				}}
			/>
			<Input
				label="Amount"
				error={inputErrors.amount}
				textInputConfig={{
					placeholder: "0.00",
					keyboardType: "decimal-pad",
					value: inputs.amount,
					onChangeText: (enteredValue) => inputChangedHandler("amount", enteredValue),
				}}
			/>
			<Input
				label="Date"
				error={inputErrors.date}
				textInputConfig={{
					placeholder: "YYYY-MM-DD",
					value: inputs.date,
					onChangeText: (enteredValue) => inputChangedHandler("date", enteredValue),
					maxLength: 10,
				}}
			/>

			<View style={styles.actions}>
				<Button onPress={submitHandler} disabled={disabled}>{submitButtonText}</Button>
				<Button mode="flat" onPress={onCancel} disabled={disabled}>
					Cancel
				</Button>
			</View>
		</View>
	);
};

export default ExpenseForm;

const styles = StyleSheet.create({
	form: {
		gap: 10,
	},
	actions: {
		justifyContent: "center",
		gap: 12,
		marginTop: 14,
	},
});
