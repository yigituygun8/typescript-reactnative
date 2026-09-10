import { StyleSheet, Text } from 'react-native';
import Colors from '../utils/colors';

export default function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
    color: Colors.primary,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingBottom: 4,
    borderRadius: 4,
  },
});
