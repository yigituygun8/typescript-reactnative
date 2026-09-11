import { View, StyleSheet, Text, Image } from 'react-native';
import Title from '../components/Title';
import PrimaryButton from '../components/PrimaryButton';
import Colors from '../utils/colors';

export default function GameOverScreen( { roundsNumber, userNumber, onStartNewGame } ) {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>GAME OVER!</Title>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/success.png')} style={styles.image} />
      </View>
      <View>
        <Text style={styles.summaryText}>Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.</Text>
      </View>
      <PrimaryButton title="Start New Game" onPress={onStartNewGame}></PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {},
  imageContainer: {
    width: 350,
    height: 350,
    borderRadius: 175,
    borderWidth: 3,
    borderColor: Colors.primary,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  summaryText: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 20,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: Colors.primary,
    paddingVertical: 10,
  },
});