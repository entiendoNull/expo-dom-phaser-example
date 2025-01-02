import { type DOMImperativeFactory } from "expo/dom";

export interface GameProps {
	collectedStar: (points: number) => void;
}

export interface GameRef extends DOMImperativeFactory {
	moveLeft: () => void;
	moveRight: () => void;
	stopMoving: () => void;
	jump: () => void;
}
