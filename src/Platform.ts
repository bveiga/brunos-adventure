import { Direction } from "./types";

export default class Platform {
	gameWidth: number;
	gameHeight: number;
	width: number;
	height: number;
	position: Direction;

	constructor(gameWidth: number, gameHeight: number) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;

		this.position = {
			x: 100,
			y: this.gameHeight - 100
		};

		this.width = 300;
		this.height = 20;
	}

	draw(context: CanvasRenderingContext2D) {
		context.fillStyle = 'Blue';
		context.fillRect(
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
	}
}