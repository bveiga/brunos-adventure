import { AxisTuple } from "../types";

export default class Player {
	currentSprite: HTMLImageElement;
	frames: AxisTuple;
	gameHeight: number;
	gameWidth: number;
	gravity: number;
	height: number;
	position: AxisTuple;
	speed: number;
	spriteCrop: AxisTuple;
	sprites: any;
	velocity: AxisTuple;
	width: number;

	constructor(gameWidth: number, gameHeight: number, images: HTMLImageElement[]) {
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
		this.sprites = {
			stand: {
				crop: 177,
				left: images[2],
				right: images[3],
				width: 66,
			},
			run: {
				crop: 341,
				left: images[0],
				right: images[1],
				width: 127.875,
			}
		};

		this.currentSprite = this.sprites.stand.right;

		this.spriteCrop = {
			x: 177,
			y: 400
		}

		this.width = 66;
		this.height = 150;
		this.frames ={
			x: 0,
			y: 0
		};
	}

	draw(context: CanvasRenderingContext2D ) {
		context.drawImage(
			this.currentSprite,
			this.spriteCrop.x * this.frames.x,
			0,
			this.spriteCrop.x,
			this.spriteCrop.y,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
	}

	update() {
		this.frames.x++;
		if(this.frames.x > 59
			&& (this.currentSprite === this.sprites.stand.left
				|| this.currentSprite === this.sprites.stand.right)
		) {
			this.frames.x = 0;
		} else if(this.frames.x > 29
			&& (this.currentSprite === this.sprites.run.left
				|| this.currentSprite === this.sprites.run.right)
		) {
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