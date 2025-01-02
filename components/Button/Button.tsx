import * as React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { ButtonProps } from "./Button.types";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

const AnimatedTouchableOpacity =
	Animated.createAnimatedComponent(TouchableOpacity);

export function Button(props: ButtonProps) {
	const scale = useSharedValue(1);

	function pressedHandler() {
		scale.value = withTiming(0.9, { duration: 100 });
		if (props.hasHaptic) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
		props.onPressIn?.();
	}

	function releasedHandler() {
		scale.value = withTiming(1, { duration: 100 });
		props.onPressOut?.();
	}

	return (
		<AnimatedTouchableOpacity
			style={[styles.button, { transform: [{ scale: scale }] }]}
			onPressIn={pressedHandler}
			onPressOut={releasedHandler}
			activeOpacity={0.7}
		>
			{props.children}
		</AnimatedTouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "rgba(255, 215, 0, 0.8)",
		borderWidth: 4,
		borderColor: "#DAA520",
		borderRadius: 36,
		width: 72,
		height: 72,
		alignItems: "center",
		justifyContent: "center",
	},
});
