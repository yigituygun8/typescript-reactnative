import { StyleSheet, Text, View, Pressable } from "react-native";

const CategoryGridTile = ({ title, color, onPress }) => {
  return (
    <View style={styles.gridItem}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: color },
          pressed && styles.buttonPressed,
        ]}
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4, // This property is used to add a shadow effect on Android devices. It creates a visual depth by casting a shadow below the component, making it appear elevated from the background.
    shadowColor: "black", // This property sets the color of the shadow on iOS devices. In this case, it is set to black, which means that the shadow will be dark and visible against lighter backgrounds.
    shadowOpacity: 0.25, // This property controls the opacity of the shadow on iOS devices. A value of 0.25 means that the shadow will be partially transparent, allowing some of the background to show through.
    shadowOffset: { width: 0, height: 2 }, // This property defines the offset of the shadow on iOS devices. It specifies how far the shadow should be displaced from the component in both horizontal (width) and vertical (height) directions. In this case, the shadow is offset by 2 pixels in the vertical direction.
  },
  button: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },  
  buttonPressed: {
    opacity: 0.5, // This property sets the opacity of the button when it is pressed. A value of 0.5 means that the button will become semi-transparent, giving visual feedback to the user that the button is being interacted with.
  },    
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  }
});
