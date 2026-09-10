import { Alert, View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Title from "../components/Title";
import NumberContainer from "../components/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
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
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 99, userNumber)
  );
  const [guessRange, setGuessRange] = useState({ min: 1, max: 99 });
  
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
    setCurrentGuess(generateRandomBetween(nextMin, nextMax, currentGuess));
  }

  useEffect(() => {
    if(currentGuess === userNumber) {
      onGameOver(); // Call the onGameOver function passed as a prop when the current guess matches the user's number.
    }
  }, [currentGuess, userNumber, onGameOver]); // This effect runs whenever currentGuess or userNumber changes. If the current guess matches the user's number, it calls the onGameOver function to indicate that the game is over.

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
});
