import { Dimensions } from "react-native";
import * as Phaser from "phaser";
import sky from "@/assets/game/sky.png";
import star from "@/assets/game/star.png";
import ground from "@/assets/game/platform.png";
import dude from "@/assets/game/dude.png";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height + 100;

class GameScene extends Phaser.Scene {
	platforms: Phaser.Physics.Arcade.StaticGroup | null = null;
	player: Phaser.Physics.Arcade.Sprite | null = null;
	private onStarCollected: ((points: number) => void) | null = null;
	points: number = 0;
	collectedStars: number = 0;

	constructor() {
		super({ key: "StartScene" });
	}

	setStarCollectedCallback(callback: (points: number) => void) {
		this.onStarCollected = callback;
	}

	preload(): void {
		this.load.image("sky", sky.uri);
		this.load.image("ground", ground.uri);
		this.load.image("star", star.uri);
		this.load.spritesheet("dude", dude.uri, {
			frameWidth: 32,
			frameHeight: 48,
		});
	}

	create(): void {
		this.add
			.tileSprite(0, 0, WIDTH * 2, HEIGHT, "sky")
			.setOrigin(0, 0)
			.setScrollFactor(0);

		this.platforms = this.physics.add.staticGroup();

		this.platforms
			.create(WIDTH / 2, HEIGHT - 32, "ground")
			.setScale(2.5)
			.refreshBody();

		this.platforms.create(WIDTH * 0.75, HEIGHT * 0.6, "ground");
		this.platforms.create(WIDTH * 0.2, HEIGHT * 0.4, "ground");
		this.platforms.create(WIDTH * 0.8, HEIGHT * 0.25, "ground");

		this.physics.world.setBounds(0, -Infinity, WIDTH, Infinity);

		this.player = this.physics.add.sprite(100, HEIGHT - 100, "dude");

		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true, 1, 0, true);

		this.anims.create({
			key: "left",
			frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1,
		});

		this.anims.create({
			key: "turn",
			frames: [{ key: "dude", frame: 4 }],
			frameRate: 20,
		});

		this.anims.create({
			key: "right",
			frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1,
		});

		this.physics.add.collider(this.player, this.platforms);

		this.cameras.main.startFollow(this.player, true);
		this.cameras.main.setLerp(0.1, 0.1);
		this.cameras.main.setBounds(0, -Infinity, WIDTH, Infinity);

		const stars = this.physics.add.group({
			key: "star",
			repeat: 11,
			setXY: { x: 12, y: 0, stepX: 70 },
		}) as Phaser.Physics.Arcade.Group;

		stars.children.iterate((child) => {
			const star = child as Phaser.Physics.Arcade.Image;
			star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
			return null;
		});

		this.physics.add.collider(stars, this.platforms);
		this.physics.add.collider(this.player, this.platforms);
		this.physics.add.collider(stars, this.platforms);

		this.physics.add.overlap(
			this.player,
			stars,
			this.collectStar as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
			undefined,
			this
		);
	}

	collectStar = (
		_player: Phaser.Physics.Arcade.Sprite,
		star: Phaser.Physics.Arcade.Image
	) => {
		star.disableBody(true, true);
		this.points += 10;
		this.collectedStars += 1;
		this.onStarCollected?.(this.points);
	};

	moveRight = (): void => {
		if (this.player) {
			this.player.setVelocityX(160);
			this.player.anims.play("right", true);
		}
	};

	moveLeft = (): void => {
		if (this.player) {
			this.player.setVelocityX(-160);
			this.player.anims.play("left", true);
		}
	};

	stopMoving() {
		if (this.player) {
			this.player.setVelocityX(0);
			this.player.anims.play("turn", true);
		}
	}

	jump() {
		if (this.player && this.player.body) {
			const currentVelocityX = this.player.body.velocity.x;
			this.player.setVelocityY(-330);
			this.player.setVelocityX(currentVelocityX);
		}
	}
}

export default GameScene;
