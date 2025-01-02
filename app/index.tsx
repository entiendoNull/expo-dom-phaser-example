import * as React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/Button/Button";
import GameWrapper from "@/components/Game/Game";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GameRef } from "@/components/Game/Game.types";
import Score from "@/components/Score/Score";

function Index() {
	const gameRef = React.useRef<GameRef>(null);
	const insets = useSafeAreaInsets();
	const [points, setPoints] = React.useState(0);

	function collectedStarHandler(newPoints: number) {
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
		setPoints(newPoints);
	}

	function moveLeftHandler() {
		gameRef.current?.moveLeft();
	}

	function moveRightHandler() {
		gameRef.current?.moveRight();
	}

	function jumpHandler() {
		gameRef.current?.jump();
	}

	function stopMovingHandler() {
		gameRef.current?.stopMoving();
	}

	return (
		<View style={styles.container}>
			<Score points={points} isComplete={points >= 120} />
			<GameWrapper
				ref={gameRef}
				collectedStar={collectedStarHandler}
				dom={{
					scrollEnabled: false,
					style: {
						height: Dimensions.get("screen").height,
						width: Dimensions.get("screen").width,
					},
				}}
			/>
			<View style={styles.bottomBar}>
				<View style={styles.innerWrapper}>
					<View style={styles.directionWrapper}>
						<Button onPressIn={moveLeftHandler} onPressOut={stopMovingHandler}>
							<AntDesign name="left" size={32} color="#1E3A8A" />
						</Button>
						<Button onPressIn={moveRightHandler} onPressOut={stopMovingHandler}>
							<AntDesign name="right" size={32} color="#1E3A8A" />
						</Button>
					</View>

					<View style={styles.jumpWrapper}>
						<Button hasHaptic onPressIn={jumpHandler}>
							<AntDesign name="up" size={32} color="#1E3A8A" />
						</Button>
					</View>
				</View>
			</View>
		</View>
	);
}

export default Index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomBar: {
		position: "absolute",
		bottom: 0,
		width: "100%",
	},
	innerWrapper: {
		height: 80,
		flexDirection: "row",
	},
	directionWrapper: {
		flex: 1,
		paddingLeft: 24,
		flexDirection: "row",
		gap: 16,
	},
	jumpWrapper: {
		flex: 1,
		alignItems: "flex-end",
		paddingRight: 24,
	},
});
