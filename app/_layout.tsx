import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Stack screenOptions={{ headerShown: false }} />
		</GestureHandlerRootView>
	);
}

export default RootLayout;
