import { FlatList, StyleSheet } from "react-native";
import MealItem from "./MealItem";

const MealList = ({ meals, onMealPress }) => {
	function renderMealItem(itemData) {
		return (
			<MealItem
				item={itemData.item}
				onPress={() => onMealPress(itemData.item)}
			/>
		);
	}

	return (
		<FlatList
			data={meals}
			keyExtractor={(item) => item.id}
			renderItem={renderMealItem}
			contentContainerStyle={styles.list}
		/>
	);
};

export default MealList;

const styles = StyleSheet.create({
	list: {
		padding: 16,
	},
});
