import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

const PLACEHOLDER_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/500px-No-Image-Placeholder.svg.png";

const MealDetailScreen = ({ route }) => {
  const { mealProps } = route.params;
  const {
    title,
    imageUrl,
    duration,
    complexity,
    affordability,
    ingredients,
    steps,
    isGlutenFree,
    isVegan,
    isVegetarian,
    isLactoseFree,
  } = mealProps;
  const [imageUri, setImageUri] = useState(imageUrl);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        accessibilityLabel={title}
        onError={() => setImageUri(PLACEHOLDER_IMAGE)}
      />
			<View style={{ flex: 1, paddingLeft: 4 }}>
				<Text style={styles.title}>{title}</Text>

				<View style={styles.metadata}>
					<Text style={styles.metadataText}>{duration} min</Text>
					<Text style={styles.separator}>|</Text>
					<Text style={styles.metadataText}>{complexity}</Text>
					<Text style={styles.separator}>|</Text>
					<Text style={styles.metadataText}>{affordability}</Text>
				</View>

				<Text style={styles.sectionTitle}>Ingredients</Text>
				{ingredients.map((ingredient) => (
					<Text key={ingredient} style={styles.listItem}>
						• {ingredient}
					</Text>
				))}

				<Text style={styles.sectionTitle}>Steps</Text>
				{steps.map((step, index) => (
					<View key={step} style={styles.step}>
						<View style={styles.stepNumberCircle}>
							<Text style={styles.stepNumber}>{index + 1}</Text>
						</View>
						<Text style={styles.stepText}>{step}</Text>
					</View>
				))}

				<Text style={styles.sectionTitle}>Dietary information</Text>
				<Text style={styles.listItem}>
					{[
						isGlutenFree && "Gluten-free",
						isVegan && "Vegan",
						isVegetarian && "Vegetarian",
						isLactoseFree && "Lactose-free",
					]
						.filter(Boolean)
						.join(" • ") || "No specific dietary labels"}
				</Text>
			</View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
  image: {
    width: "100%",
    height: 240,
  },
  title: {
    paddingHorizontal: 16,
    paddingTop: 20,
    color: "#1f2933",
    fontSize: 28,
    fontWeight: "700",
  },
  metadata: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  metadataText: {
    color: "#667085",
    fontSize: 14,
    textTransform: "capitalize",
  },
  separator: {
    marginHorizontal: 8,
    color: "#c1c7d0",
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
    color: "#762f05",
    fontSize: 21,
    fontWeight: "700",
  },
  listItem: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 4,
    color: "#344054",
    fontSize: 16,
    lineHeight: 23,
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  stepNumberCircle: {
    width: 28,
    height: 28,
    marginRight: 12,
    borderRadius: 14,
    backgroundColor: "#762f05",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumber: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  stepText: {
    flex: 1,
    color: "#344054",
    fontSize: 16,
    lineHeight: 23,
  },
});