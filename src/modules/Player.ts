import { AxisTuple } from "../types";

export default class Player {
	frameX: number;
	frameY: number;
	gameHeight: number;
	gameWidth: number;
	gravity: number;
	height: number;
	position: AxisTuple;
	speed: number;
	velocity: AxisTuple;
	width: number;

	constructor(gameWidth: number, gameHeight: number) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.width = 30;
		this.height = 30;
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
		this.frameX = 0;
		this.frameY = 0;
	}

	draw(context: CanvasRenderingContext2D ) {
		context.fillStyle = 'red';
		context.fillRect(this.position.x, this.position.y, this.width, this.height);
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