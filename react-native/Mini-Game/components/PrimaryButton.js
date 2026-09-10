import { View, StyleSheet, Text, Pressable } from 'react-native';
import Colors from '../utils/colors';

export default function PrimaryButton({ onPress, title, children }) {
  function pressHandler() {
    console.log(`Button pressed: ${title}`);
    onPress(); // Call the onPress function passed as a prop
  }
  return (
    // Dış View: Ekrandaki konumlandırma ve düzen için
    <View style={styles.buttonOuterContainer}>
      {/* Pressable: Tıklama yönetimi ve görsel buton tasarımı */}
      <Pressable 
        onPress={pressHandler} 
        style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}
        android_ripple={{ color: Colors.primaryDark }} // Android için tıklama dalga efekti
      >
        <View style={styles.content}>
          {children}
          <Text style={styles.text}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden', // Android ripple efektinin taşmasını engeller
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary, // Örnek bir buton rengi
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    color: Colors.white,
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  pressed: { // Adding it for iOS feedback because android_ripple is only for Android
    opacity: 0.75, // iOS için basıldığında opaklığı azaltır
  }
});
