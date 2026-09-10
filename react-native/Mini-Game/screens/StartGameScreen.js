import {
  Keyboard,
  InputAccessoryView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import { useState } from "react";
import Colors from "../utils/colors";

export default function StartGameScreen({ onPickedNumber }) {
  const inputAccessoryViewID = "start-game-input-accessory";

  const [enteredNumber, setEnteredNumber] = useState("");

  const handleInputChange = (text) => {
    // No need to remove any non-numeric characters since the keyboard is set to "number-pad", which only allows numeric input. However, if you want to ensure that only numeric input is accepted, you can use a regular expression to filter out any non-numeric characters.
    const numericText = text.replace(/[^0-9]/g, ""); // This regex replaces any character that is not a digit (0-9) with an empty string, effectively removing it.
    setEnteredNumber(numericText);
  }


  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number!", "Please enter a number between 1 and 99.", [{ text: "Try Again", style: "destructive", onPress: () => setEnteredNumber("") }]);
      return;
    }
    console.log(`Confirmed number: ${chosenNumber}`);
    onPickedNumber(chosenNumber); // Call the onPickedNumber function passed as a prop with the chosen number
  }

  const resetInputHandler = () => {
    setEnteredNumber("");
  }

  return (
    <Card style={styles.container}>
      <Text style={styles.title}>Guess the Number</Text>
      <Text style={styles.subtitle}>Choose a number between 1 and 99</Text>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        inputAccessoryViewID={inputAccessoryViewID}
        placeholder="?"
        placeholderTextColor={Colors.placeholder}
        value={enteredNumber}
        onChangeText={handleInputChange}
      />
      {/* This component is used to create a custom accessory view that appears above the keyboard. It allows you to add additional controls or buttons that can be accessed while the keyboard is open. */}
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <View style={styles.inputAccessoryView}>
          <Pressable
            onPress={Keyboard.dismiss}
            style={({ pressed }) => pressed && { opacity: 0.5 }}
          >
            <Text style={styles.doneButton}>Done</Text>
          </Pressable>
        </View>
      </InputAccessoryView>
      <View style={styles.buttonRow}>
        <View style={styles.buttonWrapper}>
          <PrimaryButton title="Reset" onPress={resetInputHandler} />
        </View>

        <View style={styles.buttonWrapper}>
          <PrimaryButton title="Confirm" onPress={confirmInputHandler} />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
    marginHorizontal: 24,
  },
  title: {
    color: Colors.primary,
    fontSize: 24,
    fontFamily: "open-sans-bold",
    marginBottom: 4,
  },
  subtitle: {
    color: Colors.subtitle,
    fontSize: 14,
    fontFamily: "open-sans",
    marginBottom: 8,
  },
  numberInput: {
    width: 50,
    borderBottomWidth: 1.5,
    borderColor: Colors.text,
    borderRadius: 4,
    textAlign: "center",
    marginVertical: 16,
    fontFamily: "open-sans-bold",
    color: Colors.text,
    fontSize: 32,
  },
  inputAccessoryView: {
    alignItems: "flex-end",
    padding: 8,
    backgroundColor: Colors.accessoryBackground,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.accessoryBorder,
  },
  doneButton: {
    paddingHorizontal: 8,
    color: Colors.primary,
    fontSize: 16,
    fontFamily: "open-sans-bold",
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 4,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 2,
  },
});
