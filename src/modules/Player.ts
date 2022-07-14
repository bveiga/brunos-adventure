import { AxisTuple } from "../types";

export default class Player {
	currentSprite: number;
	frames: AxisTuple;
	gameHeight: number;
	gameWidth: number;
	gravity: number;
	height: number;
	position: AxisTuple;
	speed: number;
	sprites: HTMLImageElement[];
	velocity: AxisTuple;
	width: number;

	constructor(gameWidth: number, gameHeight: number, sprites: HTMLImageElement[]) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.gravity = 1;
		this.speed = 10;

		this.position = {
			x: 100,
			y: 100
		};

		this.velocity = {
			x: 0,
			y: 0
		};

		// Image
		this.sprites = sprites;
		this.currentSprite = 3;

		this.width = 66;
		this.height = 150;
		this.frames ={
			x: 1,
			y: 0
		};
	}

	draw(context: CanvasRenderingContext2D ) {
		context.drawImage(
			this.sprites[this.currentSprite],
			177 * this.frames.x,
			0,
			177,
			400,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
	}

	update() {
		this.frames.x++;
		if(this.frames.x > 28) {
			this.frames.x = 0;
		}

		// Horizontal movement
		this.position.x += this.velocity.x;
		if(this.position.x < 0) {
			this.position.x = 0;
		} else if(this.position.x > this.gameWidth - this.width) {
			this.position.x = this.gameWidth - this.width;
		}

		// Vertical movement
		this.position.y += this.velocity.y;
		if(this.position.y + this.height + this.velocity.y <= this.gameHeight) {
			this.velocity.y += this.gravity;
		}
	}
}