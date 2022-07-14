import { AxisTuple } from "../types";

export default class Player {
	frame: AxisTuple;
	gameHeight: number;
	gameWidth: number;
	gravity: number;
	height: number;
	image: HTMLImageElement;
	position: AxisTuple;
	speed: number;
	velocity: AxisTuple;
	width: number;

	constructor(gameWidth: number, gameHeight: number, image: HTMLImageElement) {
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
		this.image = image;
		this.width = 66;
		this.height = 150;
		this.frame ={
			x: 177,
			y: 400
		};
	}

	draw(context: CanvasRenderingContext2D ) {
		context.drawImage(
			this.image,
			0,
			0,
			this.frame.x,
			this.frame.y,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
	}

	update() {
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