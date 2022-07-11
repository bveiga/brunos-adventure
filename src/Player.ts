import InputHandler from "./InputHandler";
import { Direction } from "./types";

export default class Player<PlayerProps> {
	gameWidth: number;
	gameHeight: number;
	width: number;
	height: number;
	gravity: number;
	position: Direction;
	velocity: Direction;
	image: HTMLImageElement;
	frameX: number;
	frameY: number;

	constructor(gameWidth: number, gameHeight: number) {
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.width = 30;
		this.height = 30;
		this.gravity = 1;

		this.position = {
			x: 100,
			y: 100
		};

		this.velocity = {
			x: 0,
			y: 1
		};

		// Image
		this.image = document.getElementById('player-image') as HTMLImageElement;
		this.frameX = 0;
		this.frameY = 0;
	}

	draw(context: CanvasRenderingContext2D ) {
		context.fillStyle = 'white';
		context.fillRect(this.position.x, this.position.y, this.width, this.height);
		context.drawImage(
			this.image,
			this.frameX * this.width,
			this.frameY * this.height,
			this.width,
			this.height,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
	}

	update(input: InputHandler) {
		// Horizontal movement
		if (input.keys.has('ArrowRight')) {
			this.velocity.x = 5;
		} else if(input.keys.has('ArrowLeft')) {
			this.velocity.x = -5;
		} else {
			this.velocity.x = 0;
		}

		this.position.x += this.velocity.x;
		if(this.position.x < 0) {
			this.position.x = 0;
		} else if(this.position.x > this.gameWidth - this.width) {
			this.position.x = this.gameWidth - this.width;
		}

		// Vertical movement
		if(input.keys.has('ArrowUp') && !this.isInTheAir()) {
			this.velocity.y = -20;
		}

		this.position.y += this.velocity.y;
		if(this.isInTheAir()) {
			this.velocity.y += this.gravity;
		} else {
			this.velocity.y = 0;
		}

		if (this.position.y > this.gameHeight - this.height) {
			this.position.y = this.gameHeight - this.height;
		}
	}

	isInTheAir() {
		return this.position.y + this.height + this.velocity.y <= this.gameHeight;
	}
}