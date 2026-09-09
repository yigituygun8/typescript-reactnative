import {useState } from "react";
import { Pressable, StyleSheet, Text, View , TextInput} from 'react-native';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState(''); // This is a state variable that will hold the text entered by the user in the TextInput component. We initialize it with an empty string.
  const [courseGoals, setCourseGoals] = useState([]); // This is a state variable that will hold the list of goals entered by the user. We initialize it with an empty array.

  const goalInputHandler = (enteredText) => { // We get enteredText automatically from the TextInput component's prop when the text changes 
    setEnteredGoalText(enteredText); // We update the state variable with the new text entered by the user
  };

  const addGoalHandler = () => {
    console.log("Add Goal button pressed");
    console.log(enteredGoalText);
    setCourseGoals(currentCourseGoals => [...currentCourseGoals, enteredGoalText]);
    setEnteredGoalText('');
  }
  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Your goal!" onChangeText={goalInputHandler} />
        <Pressable style={styles.button} onPress={addGoalHandler}>
          <Text style={styles.buttonText}>Add Goal</Text>
        </Pressable>
      </View>
      <View style={styles.goalsContainer}>
        {courseGoals.map((goal, index) => <Text key={index} style={styles.goalItem}>{goal}</Text>)}
      </View>
    </View>
  );
}

// Define your styles here. These are called "Stylesheet objects" in React Native, and they are similar to CSS styles in web development. You can define your styles using the StyleSheet.create method, which helps with performance and organization.
const styles = StyleSheet.create({
  appContainer: {
    flex: 1, // This means the container will take up the full height of the screen
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  inputContainer: {
    flexDirection: 'row', // This will arrange the children (TextInput and Pressable) in a row
    alignItems: 'center', // This will vertically center the children
    marginBottom: 16, // This adds some space below the input container
    gap: 8, // This adds some space between the TextInput and the Pressable button
    width: '100%',
  },
  textInput: {
    borderWidth: 1, // This adds a border around the TextInput
    borderColor: '#ccc', // This sets the color of the border
    borderRadius: 4, // This rounds the corners of the TextInput
    padding: 8, // This adds some padding inside the TextInput
    flex: 1, // This makes the TextInput take up all available space in the row
  },
  button: {
    backgroundColor: '#f6287a', // This sets the background color of the button
    paddingVertical: 8, // This adds vertical padding inside the button
    paddingHorizontal: 16, // This adds horizontal padding inside the button
    borderRadius: 4, // This rounds the corners of the button
  },
  buttonText: {
    color: '#fff', // This sets the text color to white
    fontSize: 16, // This sets the font size of the button text
  },  
  goalsContainer: {
    // flex: 5, // This means the container will take up 5 times the space of the input container
  },
  goalItem: {
    margin: 8, // This adds some space around each goal item
    padding: 8, // This adds some padding inside each goal item
    borderRadius: 6, // This rounds the corners of each goal item
    backgroundColor: '#2563EB', // This sets the background color of each goal item
    color: 'white', // This sets the text color to white
  }
});
