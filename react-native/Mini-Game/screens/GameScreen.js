import { Alert, View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import Title from "../components/Title";
import NumberContainer from "../components/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import GuessLogItem from "../components/GuessLogItem";
import Card from "../components/Card";
import Colors from "../utils/colors";
import AntDesign from '@expo/vector-icons/AntDesign';

function generateRandomBetween(min, max, exclude) {
  if (min >= max) {
    return min;
  }

  let rndNum = exclude;
  while (rndNum === exclude) {
    rndNum = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return rndNum;
}

export default function GameScreen( { userNumber, onGameOver } ) {
  const initialGuess = generateRandomBetween(1, 99, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess); // State to hold the current guess made by the app. Initially, it's set to a random number between 1 and 99, excluding the user's number.
  const [guessRange, setGuessRange] = useState({ min: 1, max: 99 });
  const [roundsNumber, setRoundsNumber] = useState([
    { value: initialGuess, id: `${Date.now()}` },
  ]); // State to hold the rounds taken to guess the user's number. Each round has a unique id, so React can track list items correctly even though we prepend new items.


  function nextGuessHandler(direction) {
    if (direction === "lower" && userNumber > currentGuess) {
      Alert.alert(
        "Wrong direction",
        "Your number is higher than the current guess. Choose Higher."
      );
      return;
    }

    if (direction === "higher" && userNumber < currentGuess) {
      Alert.alert(
        "Wrong direction",
        "Your number is lower than the current guess. Choose Lower."
      );
      return;
    }

    let nextMin = guessRange.min;
    let nextMax = guessRange.max;

    if (direction === "higher") {
      if (currentGuess >= guessRange.max) {
        return;
      }
      nextMin = currentGuess + 1;
    } else if (direction === "lower") {
      if (currentGuess <= guessRange.min) {
        return;
      }
      nextMax = currentGuess - 1;
    }

    console.log(`Min: ${nextMin}, Max: ${nextMax}`);
    setGuessRange({ min: nextMin, max: nextMax });
    const newRndNumber = generateRandomBetween(nextMin, nextMax, currentGuess);
    setCurrentGuess(newRndNumber);
    setRoundsNumber((prevRounds) => [
      { value: newRndNumber, id: `${Date.now()}` },
      ...prevRounds,
    ]); // Update the roundsNumber state by adding the new guess to the array of previous guesses.
  }

  useEffect(() => {
    if(currentGuess === userNumber) {
      onGameOver(roundsNumber.length); // Call the onGameOver function passed as a prop when the current guess matches the user's number.
    }
  }, [currentGuess, userNumber, onGameOver]); // This effect runs whenever currentGuess or userNumber changes. If the current guess matches the user's number, it calls the onGameOver function to indicate that the game is over.

  useEffect(() => {
    setGuessRange({ min: 1, max: 99 }); // Reset the guess range to its initial values when the component mounts.
  }, []); // This effect runs only once when the component mounts, resetting the guess range to its initial values.

  const roundsListLength = roundsNumber.length; // Get the length of the roundsNumber array to display the number of rounds taken to guess the user's number.

  return (
    <View style={styles.container}>
      <Card style={styles.gameCard}>
        <Title>Opponent's Guess</Title>
        <Text style={styles.instruction}>
          Is your number higher or lower than this?
        </Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Text style={styles.prompt}>Choose a direction</Text>
        <View style={styles.buttonRow}>
          <View style={styles.buttonWrapper}>
            <PrimaryButton
              onPress={() => nextGuessHandler("lower")}
              title="Lower"
            >
              <AntDesign name="minus" size={18} color={Colors.white} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonWrapper}>
             <PrimaryButton
              onPress={() => nextGuessHandler("higher")}
              title="Higher"
            >
              <AntDesign name="plus" size={18} color={Colors.white} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <ScrollView
        style={styles.logContainer}
        contentContainerStyle={styles.logContent}
      >
        {roundsNumber.map((round, index) => (
          <GuessLogItem
            key={round.id}
            roundNumber={roundsListLength - index}
            guess={round.value}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  gameCard: {
    width: "100%",
    maxWidth: 420,
    alignItems: "center",
    borderRadius: 16,
  },
  instruction: {
    maxWidth: 260,
    marginTop: 4,
    color: Colors.subtitle,
    fontSize: 15,
    fontFamily: "open-sans",
    lineHeight: 21,
    textAlign: "center",
  },
  prompt: {
    marginTop: 8,
    color: Colors.text,
    fontSize: 14,
    fontFamily: "open-sans-bold",
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    marginTop: 8,
  },
  buttonWrapper: {
    flex: 1,
  },
  logContainer: {
    flex: 1,
    width: "100%",
    maxWidth: 420,
  },
  logContent: {
    paddingBottom: 24,
  },
});