import * as React from "react";
import { View, StyleSheet } from "react-native";
import { ScoreProps } from "./ScoreProps.types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

function Score(props: ScoreProps) {
	const scale = useSharedValue(1);
	const insets = useSafeAreaInsets();

	React.useEffect(() => {
		scale.value = withTiming(1.2, { duration: 100 }, () => {
			scale.value = withTiming(1, { duration: 100 });
		});
	}, [props.points]);

	return (
		<View style={[styles.scoreContainer, { top: insets.top + 24 }]}>
			<Animated.Text
				style={[styles.scoreText, { transform: [{ scale: scale }] }]}
			>
				{props.isComplete ? "You win!" : `Points: ${props.points}`}
			</Animated.Text>
		</View>
	);
}

export default Score;

const styles = StyleSheet.create({
	scoreContainer: {
		position: "absolute",
		left: 16,
		zIndex: 1,
	},
	scoreText: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#DAA520",
	},
});
