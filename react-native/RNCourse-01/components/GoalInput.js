import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  Modal,
} from "react-native";

export function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState(props.initialValue ?? "");

  const goalInputHandler = (enteredText) => {
    // We get enteredText automatically from the TextInput component's prop when the text changes
    setEnteredGoalText(enteredText); // We update the state variable with the new text entered by the user
  };

  const addGoalHandler = () => {
    let isAdded = props.onAddGoal(enteredGoalText); // We call the onAddGoal function passed as a prop from the parent component (App.js) and pass the enteredGoalText as an argument. This allows the parent component to access the entered goal text and add it to the list of goals.
    if (isAdded) {
      props.onCancel(); // We call the onCancel function passed as a prop from the parent component (App.js) to close the modal after adding the goal.
      setEnteredGoalText(""); // We reset the enteredGoalText state variable to an empty string after adding the goal. This clears the TextInput field for the next goal entry.
    }
  };
  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      transparent
    >
      <Pressable style={styles.backdrop} onPress={props.onCancel}>
        <View
          style={styles.modalContainer}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Your goal!"
              onChangeText={goalInputHandler}
              value={enteredGoalText}
            />
            <Pressable style={styles.button} onPress={addGoalHandler} role="button">
                <Text style={styles.buttonText}>{props.buttonText}</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "88%",
    padding: 24,
    borderRadius: 12,
    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: "row", // This will arrange the children (TextInput and Pressable) in a row
    alignItems: "center", // This will vertically center the children
    gap: 8, // This adds some space between the TextInput and the Pressable button
    width: "100%",
  },
  textInput: {
    borderWidth: 1, // This adds a border around the TextInput
    borderColor: "#ccc", // This sets the color of the border
    borderRadius: 4, // This rounds the corners of the TextInput
    padding: 8, // This adds some padding inside the TextInput
    flex: 1, // This makes the TextInput take up all available space in the row
  },
  button: {
    backgroundColor: "#f6287a", // This sets the background color of the button
    paddingVertical: 8, // This adds vertical padding inside the button
    paddingHorizontal: 16, // This adds horizontal padding inside the button
    borderRadius: 4, // This rounds the corners of the button
  },
  buttonText: {
    color: "#fff", // This sets the text color to white
    fontSize: 16, // This sets the font size of the button text
  },
});
