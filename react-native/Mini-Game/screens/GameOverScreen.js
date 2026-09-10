import { View, StyleSheet, Text } from 'react-native';

export default function GameOverScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontFamily: 'open-sans-bold',
  },
});