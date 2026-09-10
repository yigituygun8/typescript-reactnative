import { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, Pressable, Keyboard } from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'; // SafeAreaProvider and SafeAreaView are used to handle safe area insets on devices with notches or rounded corners. They ensure that the content is displayed within the safe area of the screen, avoiding any overlap with system UI elements.
import Colors from './utils/colors';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [userNumber, setUserNumber] = useState(); // State to hold the user's chosen number. Initially, it's undefined.
  const [gameOver, setGameOver] = useState(true); 

  const [fontsLoaded, fontError] = useFonts({
    "open-sans": require("./assets/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded) {
    return null;
  }

  const pickedNumberHandler = (pickedNumber) => {
    setGameOver(false); // Set the gameOver state to false when the user picks a number, indicating that the game is now in progress.
    setUserNumber(pickedNumber); // Update the state with the number picked by the user.
  }

  const gameOverHandler = () => {
    setGameOver(true); // Set the gameOver state to true when the game is over.
  }
  
  // We are gonna do navigation programmatically, so we will not use the navigation prop here. Instead, we will use a state variable to determine which screen to show based on the user's input. If the user has confirmed a valid number, we will show the GameScreen; otherwise, we will show the StartGameScreen.
  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />; // Default screen is the StartGameScreen
  
  if(userNumber) { // If the user has picked a number, we will show the GameScreen.
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />; // Show the GameScreen if a number has been picked.
  }

  if(gameOver && userNumber) { // If the game is over and a number has been picked, we will show the GameOverScreen.
    screen = <GameOverScreen />; // Show the GameOverScreen if the game is over and a number has been picked.
  }

  return (
    <SafeAreaProvider>
      <LinearGradient colors={[Colors.screenGradientStart, Colors.accent]} style={styles.rootScreen}>
        <ImageBackground
          source={require('./assets/background.png')}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={{ opacity: 0.25 }}
        >
          <SafeAreaView style={styles.rootScreen}>
            <Pressable
              style={styles.rootScreen}
              onPress={Keyboard.dismiss}
              android_ripple={{ color: Colors.ripple }}
            >
              {screen}
            </Pressable>
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1, // This makes the root screen take up the entire available space of the device's screen. It ensures that the StartGameScreen component fills the whole screen area.
  },
});
