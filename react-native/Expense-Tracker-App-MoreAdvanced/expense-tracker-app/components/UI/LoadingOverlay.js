import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export function LoadingOverlay({ visible = true, message = "Loading..." }) {
	if (!visible) {
		return null;
	}

	return (
		<View style={styles.overlay} accessibilityRole="progressbar">
			<ActivityIndicator size="large" color={GlobalStyles.colors.accent500} />
			<Text style={styles.message}>{message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	overlay: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
		borderRadius: 16,
		backgroundColor: "rgba(32, 3, 100, 0.88)",
		zIndex: 1,
	},
	message: {
		color: GlobalStyles.colors.primary50,
		fontSize: 14,
		fontWeight: "600",
	},
});