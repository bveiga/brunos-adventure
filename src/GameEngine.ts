import Platform from "./Platform";
import Player from "./Player";

export default class GameEngine {
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	keys: Set<string>;
	player: Player;
	// platforms: Platform[];
	platform: Platform;

	constructor() {
		// Get canvas
		this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
		this.context = this.canvas?.getContext('2d') as CanvasRenderingContext2D;

		// Set game dimensions
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		this.player = new Player(this.canvas.width, this.canvas.height);
		this.platform = new Platform(this.canvas.width, this.canvas.height);
		// this.platforms = [new Platform(this.canvas.width, this.canvas.height)];

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
			console.log(evt.key, this.keys);
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
			console.log(evt.key, this.keys);
		});
	}

	playerCollision(platform: Platform) {
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
		}

		if(this.keys.has('ArrowUp') && !this.player.isInTheAir()) {
			this.player.velocity.y = -20;
		}
	}
}