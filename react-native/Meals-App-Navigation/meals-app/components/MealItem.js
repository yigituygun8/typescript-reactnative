import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useState } from "react";

const PLACEHOLDER_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/500px-No-Image-Placeholder.svg.png";

const MealItem = ({ item, onPress }) => {
  const [imageUri, setImageUri] = useState(item.imageUrl);

  return (
    <View style={styles.card}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={onPress} // to navigate to MealDetailScreen when pressed
        android_ripple={{color: "#ccc"}}
      >
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          accessibilityLabel={item.title}
          onError={() => setImageUri(PLACEHOLDER_IMAGE)}
        />

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>

          <View style={styles.metadata}>
            <Text style={styles.metadataText}>{item.duration} min</Text>
            <Text style={styles.separator}>|</Text>
            <Text style={styles.metadataText}>{item.complexity}</Text>
            <Text style={styles.separator}>|</Text>
            <Text style={styles.metadataText}>{item.affordability}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 14,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.16,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  button: {
    borderRadius: 16,
    overflow: "hidden",
  },
  buttonPressed: {
    opacity: 0.78,
  },
  image: {
    width: "100%",
    height: 190,
  },
  details: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  title: {
    color: "#1f2933",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 25,
  },
  metadata: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
  },
  metadataText: {
    color: "#667085",
    fontSize: 13,
    textTransform: "capitalize",
  },
  separator: {
    marginHorizontal: 8,
    color: "#c1c7d0",
    fontSize: 13,
  },
});
