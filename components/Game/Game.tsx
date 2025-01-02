"use dom";
import * as React from "react";
import { useDOMImperativeHandle } from "expo/dom";
import Game from "./phaser/Game";
import { GameProps, GameRef } from "./Game.types";

export default React.forwardRef<
	GameRef,
	GameProps & { dom: import("expo/dom").DOMProps }
>(function GameWrapper(props, ref) {
	const gameInstance = React.useRef<Game | null>(null);

	React.useEffect(() => {
		gameInstance.current = new Game();
		gameInstance.current?.collectedStar(props.collectedStar);

		return () => {
			gameInstance.current?.destroy();
		};
	}, []);

	useDOMImperativeHandle<GameRef>(
		ref,
		() => ({
			moveLeft: () => gameInstance.current?.moveLeft(),
			moveRight: () => gameInstance.current?.moveRight(),
			stopMoving: () => gameInstance.current?.stopMoving(),
			jump: () => gameInstance.current?.jump(),
		}),
		[gameInstance.current]
	);

	return <div id="game"></div>;
});
