import Platform from "./Platform";
import Player from "./Player";
import GenericObject from "./GenericObject";
import { Assets } from "../types";

export default class GameEngine {
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	gameAssets: Assets;
	genericObjects: GenericObject[];
	keys: Set<string>;
	player: Player;
	platforms: Platform[];
	scrollOffset: number;

	constructor(gameAssets: Assets) {
		// Get canvas
		this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
		this.context = this.canvas?.getContext('2d') as CanvasRenderingContext2D;

		// Set game dimensions
		this.canvas.width = 1024;
		this.canvas.height = 576;

		this.gameAssets = gameAssets;
		this.player = new Player(this.canvas.width, this.canvas.height, gameAssets.playerSprites);
		this.platforms = [];
		this.genericObjects = [];
		this.scrollOffset = 0;

		this.keys = new Set();
		window.addEventListener('keydown', (evt) => {
			switch(evt.key) {
				case 'ArrowDown':
				case 'ArrowUp':
					this.keys.add(evt.key);
					break;
				case 'ArrowLeft':
					this.player.spriteCrop.x = this.player.sprites.run.crop;
					this.player.width = this.player.sprites.run.width;
					this.player.currentSprite = this.player.sprites.run.left;
					this.keys.add(evt.key);
					break;
				case 'ArrowRight':
					this.player.spriteCrop.x = this.player.sprites.run.crop;
					this.player.width = this.player.sprites.run.width;
					this.player.currentSprite = this.player.sprites.run.right;
					this.keys.add(evt.key);
					break;
				default:
					break;
			}
		});

		window.addEventListener('keyup', (evt) => {
			switch(evt.key) {
				case 'ArrowDown':
				case 'ArrowUp':
					this.keys.delete(evt.key);
					break;
				case 'ArrowLeft':
					this.player.spriteCrop.x = this.player.sprites.stand.crop;
					this.player.width = this.player.sprites.stand.width;
					this.player.currentSprite = this.player.sprites.stand.left;
					this.keys.delete(evt.key);
					break;
				case 'ArrowRight':
					this.player.spriteCrop.x = this.player.sprites.stand.crop;
					this.player.width = this.player.sprites.stand.width;
					this.player.currentSprite = this.player.sprites.stand.right;
					this.keys.delete(evt.key);
					break;
				default:
					break;
			}
		});

		this.reset(false);
	}

	reset(hasInitialized: Boolean) {
		if(hasInitialized) {
			this.player = new Player(this.canvas.width, this.canvas.height, this.gameAssets.playerSprites);
			this.platforms = [];
			this.genericObjects = [];
			this.scrollOffset = 0;
		}

		// Creating small platforms
		let platformSmallImage = this.gameAssets.platformSmallImage;
		this.platforms.push(
			new Platform({x: 1400, y: this.canvas.height - platformSmallImage.height}, platformSmallImage),
			new Platform({x: 3010, y: this.canvas.height - platformSmallImage.height - 100}, platformSmallImage)
		);

		// Creating wide platforms
		let platformImage = this.gameAssets.platformImage;
		this.platforms.push(
			new Platform({x: 0, y: this.canvas.height - platformImage.height}, platformImage),
			new Platform({x: 580 - 3, y: this.canvas.height - platformImage.height}, platformImage),
			new Platform({x: (580 * 2) + 100, y: this.canvas.height - platformImage.height}, platformImage),
			new Platform({x: (580 * 3) + 250, y: this.canvas.height - platformImage.height}, platformImage),
			new Platform({x: (580 * 4) + 400, y: this.canvas.height - platformImage.height}, platformImage)
		);

		// Creating background
		this.genericObjects.push(new GenericObject({x: -1, y: -1}, this.gameAssets.bgImage));

		// Creating Hills
		let hillsImage = this.gameAssets.hillsImage;
		this.genericObjects.push(
			new GenericObject ({x: -1, y: -1}, hillsImage),
			new GenericObject ({x: -1, y: -1}, hillsImage)
		);
	}

	handleCollision(platform: Platform) {
		if(this.player.position.y + this.player.height <= platform.position.y
			&& this.player.position.y + this.player.height + this.player.velocity.y >= platform.position.y
			&& this.player.position.x + this.player.width >= platform.position.x
			&& this.player.position.x + this.player.width <= platform.position.x + platform.width
		) {
			this.player.velocity.y = 0;

			// Only allow jumps from platforms
			if(this.keys.has('ArrowUp')) {
				this.player.velocity.y = -20;
			}
		}
	}

	handleInput() {
		// Horizontal movement for player, platform, and objects
		if (this.keys.has('ArrowRight') && this.player.position.x < 400) {
			this.player.velocity.x = this.player.speed;
		} else if((this.keys.has('ArrowLeft') && this.player.position.x > 100)
			|| (this.keys.has('ArrowLeft') && this.scrollOffset === 0 && this.player.position.x > 0)
		) {
			this.player.velocity.x = -this.player.speed;
		} else {
			this.player.velocity.x = 0;

			if(this.keys.has('ArrowRight')) {
				this.scrollOffset += this.player.speed;
				this.platforms.forEach((platform) => {
					platform.position.x -= this.player.speed;
				});

				this.genericObjects.forEach((genericObject) => {
					genericObject.position.x -= this.player.speed * .66;
				});
			} else if(this.keys.has('ArrowLeft') && this.scrollOffset > 0) {
				this.scrollOffset -= this.player.speed;
				this.platforms.forEach((platform) => {
					platform.position.x += this.player.speed;
				});

				this.genericObjects.forEach((genericObject) => {
					genericObject.position.x += this.player.speed * .66;
				});
			}
		}
	}
}