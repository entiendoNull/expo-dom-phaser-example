import { Dimensions } from "react-native"
import StartScene from "./StartScene"

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height + 100

class Game {
	private game: Phaser.Game
	private scene: StartScene | null = null
	private callback: ((points: number) => void) | null = null

	constructor() {
		const config: Phaser.Types.Core.GameConfig = {
			type: Phaser.AUTO,
			width: WIDTH,
			height: HEIGHT,
			physics: {
				default: "arcade",
				arcade: {
					gravity: { y: 300, x: 0 },
					debug: false,
				},
			},
			scene: StartScene,
		}

		this.game = new Phaser.Game(config)

		this.game.events.once("ready", () => {
			this.scene = this.game.scene.getScene("StartScene") as StartScene
			if (this.callback) {
				this.scene.setStarCollectedCallback(this.callback)
			}
		})
	}

	collectedStar(cb: (points: number) => void) {
		this.callback = cb
		if (this.scene) {
			this.scene.setStarCollectedCallback(cb)
		}
	}

	destroy() {
		this.game.destroy(true)
	}

	moveRight() {
		if (!this.scene) {
			return
		}
		this.scene.moveRight()
	}

	moveLeft() {
		if (!this.scene) {
			return
		}
		this.scene.moveLeft()
	}

	stopMoving() {
		if (!this.scene) {
			return
		}
		this.scene.stopMoving()
	}

	jump() {
		if (!this.scene) {
			return
		}
		this.scene.jump()
	}
}

export default Game
