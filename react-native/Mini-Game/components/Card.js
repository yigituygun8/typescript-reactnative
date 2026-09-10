import { StyleSheet, View } from 'react-native';
import Colors from '../utils/colors';

export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: Colors.card,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    shadowOpacity: 0.25,
  },
});
