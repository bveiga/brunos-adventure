import Platform from "./Platform";
import Player from "./Player";
import PlatformImageSrc from '../images/platform.png';

export default class GameEngine {
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	keys: Set<string>;
	player: Player;
	platforms: Platform[];
	scrollOffset: number;

	constructor() {
		// Get canvas
		this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
		this.context = this.canvas?.getContext('2d') as CanvasRenderingContext2D;
		this.scrollOffset = 0;

		// Set game dimensions
		this.canvas.width = 1024;
		this.canvas.height = 576;

		this.player = new Player(this.canvas.width, this.canvas.height);
		this.platforms = [];

		let platformImage = new Image();
		platformImage.src = PlatformImageSrc;
		platformImage.onload = () => {
			this.platforms.push(new Platform({x: 100, y: this.canvas.height - platformImage.height}, platformImage));
			this.platforms.push(new Platform({x: 680, y: this.canvas.height - platformImage.height}, platformImage));
		};

		this.keys = new Set();
		window.addEventListener('keydown', (evt) => {
			switch(evt.key) {
				case 'ArrowDown':
				case 'ArrowUp':
				case 'ArrowLeft':
				case 'ArrowRight':
					this.keys.add(evt.key);
				default:
					break;
			}
		});

		window.addEventListener('keyup', (evt) => {
			switch(evt.key) {
				case 'ArrowDown':
				case 'ArrowUp':
				case 'ArrowLeft':
				case 'ArrowRight':
					this.keys.delete(evt.key);
				default:
					break;
			}
		});
	}

	handleCollision(platform: Platform) {
		if(this.player.position.y + this.player.height <= platform.position.y
			&& this.player.position.y + this.player.height + this.player.velocity.y >= platform.position.y
			&& this.player.position.x + this.player.width >= platform.position.x
			&& this.player.position.x + this.player.width <= platform.position.x + platform.width
		) {
			this.player.velocity.y = 0;
		}
	}

	handleInput() {
		if (this.keys.has('ArrowRight') && this.player.position.x < 400) {
			this.player.velocity.x = 5;
		} else if(this.keys.has('ArrowLeft') && this.player.position.x > 100) {
			this.player.velocity.x = -5;
		} else {
			this.player.velocity.x = 0;

			if(this.keys.has('ArrowRight')) {
				this.scrollOffset += 5;
				this.platforms.forEach((platform) => {
					platform.position.x -= 5;
				});
			} else if(this.keys.has('ArrowLeft')) {
				this.scrollOffset -= 5;
				this.platforms.forEach((platform) => {
					platform.position.x += 5;
				});
			}
		}

		if(this.keys.has('ArrowUp') && !this.player.isInTheAir()) {
			this.player.velocity.y = -20;
		}

		if(this.scrollOffset >= 2000) {
			console.log('You Win!');
		}
	}
}