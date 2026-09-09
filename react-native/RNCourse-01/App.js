import {useState } from "react";
import { Alert, StyleSheet, View, Keyboard, Pressable, Image,
  FlatList, // We import the FlatList component from react-native. FlatList is a performant interface for rendering simple, flat lists, supporting features like item separators, header/footer support, and pull-to-refresh. It is more efficient than using a ScrollView with a map function for large lists. 
  Text
  // ScrollView renders all its child components at once, which can lead to performance issues with large lists. FlatList, on the other hand, only renders items that are currently visible on the screen, making it more efficient for long lists.
} from 'react-native';
import { GoalItem } from './components/GoalItem';
import { GoalInput } from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]); // This is a state variable that will hold the list of goals entered by the user. We initialize it with an empty array.
  const [modalIsVisible, setModalIsVisible] = useState(false); // This is a state variable that will control the visibility of the modal. We initialize it with false, meaning the modal is hidden by default.
  const [editingGoal, setEditingGoal] = useState(null);

  const startAddGoalHandler = () => {
    setEditingGoal(null);
    setModalIsVisible(true); // We set the modalIsVisible state variable to true, which will make the modal visible when the user presses the "Add New Goal" button.
  }

  const addGoalHandler = (enteredGoalText) => {
    console.log("Add Goal button pressed");
    console.log(enteredGoalText);
    if(enteredGoalText.trim().length === 0) { // Check if the entered text is empty or only contains whitespace
      console.log("Entered text is empty or only contains whitespace");
      Alert.alert(
        "Invalid Input",
        "Please enter a valid goal.",
        [{ text: "Oh, OK", style: "default" }]
      );
      return false; // Stop the function if the text is empty
    
    }
    if (editingGoal) {
      setCourseGoals(currentCourseGoals => currentCourseGoals.map(goal =>
        goal.key === editingGoal.key
          ? { ...goal, text: enteredGoalText }
          : goal
      ));
    } else {
      setCourseGoals(currentCourseGoals => [
        ...currentCourseGoals,
        { text: enteredGoalText, key: Math.random().toString() },
      ]);
    }
    Keyboard.dismiss();
    return true;
  }

  const editGoalHandler = (goal) => {
    setEditingGoal(goal);
    setModalIsVisible(true);
  }

  const deleteGoalHandler = (key) => {
    console.log("Delete!", key);
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.key !== key); // We update the courseGoals state variable by filtering out the goal with the specified key. The filter method creates a new array that includes only the goals that do not match the key of the goal to be deleted.
    });
  }

  return (
    <View style={styles.appContainer}>
      <Pressable onPress={startAddGoalHandler} style={styles.button} role="button">
        <Text style={styles.buttonText}>Add New Goal</Text>
      </Pressable>
      {modalIsVisible && (
        <GoalInput
          onAddGoal={addGoalHandler}
          onCancel={() => setModalIsVisible(false)}
          initialValue={editingGoal?.text}
          buttonText={editingGoal ? "Save" : "Add Goal"}
          visible={modalIsVisible}
          key={editingGoal?.key ?? "new-goal"}
        />
      )}
      <View style={styles.titleContainer}>
        <Image source={require('./assets/goal.png')} style={styles.logo} />
        <Text role="heading" style={styles.title}>Your Goals</Text>
        <Text style={styles.subtitle}>Tap a goal to delete it</Text>
      </View>
      <FlatList
        data={courseGoals} // This is the array of goals that we want to render in the list. We pass the courseGoals state variable as the data prop to the FlatList component.
        keyExtractor={(item) => item.key} // We use the key from each goal to identify it uniquely.
        renderItem={({ item }) => {
          return (
            <GoalItem
              item={item}
              onDelete={deleteGoalHandler}
              onEdit={editGoalHandler}
            />
          )
        }}
        alwaysBounceVertical={false} // This prop disables the vertical bounce effect when the user scrolls to the top or bottom of the list. It is set to false to prevent the list from bouncing when the user reaches the end of the list.
        showsVerticalScrollIndicator={false} // This prop hides the vertical scroll indicator that appears on the right side of the list when the user scrolls. It is set to false to provide a cleaner look for the list.
      />
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
  button: {
    backgroundColor: "#f6287a", // This sets the background color of the button
    paddingVertical: 12, // This adds vertical padding inside the button
    paddingHorizontal: 24, // This adds horizontal padding inside the button
    borderRadius: 4, // This rounds the corners of the button
    alignItems: "center", // This centers the text inside the button horizontally
    marginBottom: 16, // This adds some space below the button
  },
  buttonText: {
    color: "#fff", // This sets the text color to white
    fontSize: 16, // This sets the font size of the text
    fontWeight: "bold", // This makes the text bold
  },
  titleContainer: {
    alignItems: 'center', // This will center the title text horizontally
    gap: 4, // This adds some space between the title and subtitle
  },
  title: {
    fontSize: 24, // This sets the font size of the title text
    fontWeight: 'bold', // This makes the title text bold
    color: '#2563EB', // This sets the color of the title text
  },
  subtitle: {
    fontSize: 14, // This sets the font size of the subtitle text
    color: '#6B7280', // This sets the color of the subtitle text
    marginBottom: 12, // This adds some space below the title text
  },
  goalsContainer: {
    flex: 1, // This means the container will take up the remaining space in the app container
  },
  logo: {
    width: 100, // This sets the width of the logo
    height: 100, // This sets the height of the logo
  },
});
