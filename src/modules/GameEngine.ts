import Platform from "./Platform";
import Player from "./Player";
import GenericObject from "./GenericObject";
import HillImageSrc from '../images/hills.png';
import PlatformImageSrc from '../images/platform.png';
import PlatformSmallImageSrc from "../images/platformSmallTall.png";
import BgImageSrc from '../images/background.png';

export default class GameEngine {
	activePlatform: number;
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	genericObjects: GenericObject[];
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

		this.activePlatform = 0;
		this.player = new Player(this.canvas.width, this.canvas.height);
		this.platforms = [];
		this.genericObjects = [];

		this.init(false);

		this.keys = new Set();
		window.addEventListener('keydown', (evt) => {
			switch(evt.key) {
				case 'ArrowDown':
				case 'ArrowLeft':
				case 'ArrowRight':
				case 'ArrowUp':
					this.keys.add(evt.key);
					break;
				default:
					break;
			}
		});

		window.addEventListener('keyup', (evt) => {
			switch(evt.key) {
				case 'ArrowDown':
				case 'ArrowLeft':
				case 'ArrowRight':
				case 'ArrowUp':
					this.keys.delete(evt.key);
					break;
				default:
					break;
			}
		});
	}

	init(isReset: Boolean) {
		if(isReset) {
			this.player = new Player(this.canvas.width, this.canvas.height);
			this.platforms = [];
			this.genericObjects = [];
			this.scrollOffset = 0;
		}

		// Creating small platforms
		this.createImage(PlatformSmallImageSrc).then((image: HTMLImageElement) => {
			let newSmallPlatforms = [
				new Platform({x: 1400, y: this.canvas.height - image.height}, image),
				new Platform({x: 3010, y: this.canvas.height - image.height - 100}, image)
			];
			this.platforms.push(...newSmallPlatforms);
		});

		// Creating wide platforms
		this.createImage(PlatformImageSrc).then((image: HTMLImageElement) => {
			let newPlatforms = [
				new Platform({x: 0, y: this.canvas.height - image.height}, image),
				new Platform({x: 580 - 3, y: this.canvas.height - image.height}, image),
				new Platform({x: (580 * 2) + 100, y: this.canvas.height - image.height}, image),
				new Platform({x: (580 * 3) + 250, y: this.canvas.height - image.height}, image),
				new Platform({x: (580 * 4) + 400, y: this.canvas.height - image.height}, image)
			];
			this.platforms.push(...newPlatforms);
		});

		// Creating background
		this.createImage(BgImageSrc).then((image: HTMLImageElement) => {
			this.genericObjects.push(new GenericObject({x: -1, y: -1}, image));
		});

		// Creating Hills
		this.createImage(HillImageSrc).then((image: HTMLImageElement) => {
			let newHills = [
				new GenericObject ({x: -1, y: -1}, image),
				new GenericObject ({x: -1, y: -1}, image)
			];
			this.genericObjects.push(...newHills);
		});
	}

	async createImage(imageSrc: string) {
		let image = new Image();
		image.src = imageSrc;

		try {
			await image.decode();
		} catch {
			console.log('Error 001: Error decoding image.');
		}
		return image;
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
		} else if(this.keys.has('ArrowLeft') && this.player.position.x > 100) {
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
			} else if(this.keys.has('ArrowLeft')) {
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